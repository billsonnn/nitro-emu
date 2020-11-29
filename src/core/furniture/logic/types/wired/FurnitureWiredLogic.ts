import { FurnitureWiredComposer, FurnitureWiredSaveComposer } from '../../../../../app';
import { IUser, User } from '../../../../user';
import { IFurniture } from '../../../interfaces';
import { FurnitureLogic } from '../FurnitureLogic';
import { FurnitureWiredData } from './data';

export class FurnitureWiredLogic extends FurnitureLogic
{
    protected _wiredData: FurnitureWiredData;

    private _userLastRuns: Map<number, number>;
    private _lastRun: number;

    constructor()
    {
        super();
        
        this._wiredData     = null;

        this._userLastRuns  = new Map();
        this._lastRun       = 0;
    }

    protected cleanUp(): void
    {
        this._userLastRuns.clear();

        this._lastRun = 0;

        super.cleanUp();
    }

    public onReady(): boolean
    {
        if(!super.onReady()) return false;

        const wiredData = this.createWiredData();

        if(!wiredData || !wiredData.setFurniture(this.furniture) || !wiredData.initializeFromFurnitureWiredData(JSON.parse(this.furniture.wiredData)) || !this.validateWiredData(wiredData)) return false;

        this._wiredData = wiredData;

        return true;
    }

    public onInteract(user: IUser, state: number = 0): void
    {
        if(!user || !this.furniture.room) return;

        if(!this.furniture.room.security.hasRights(user) || !this.validateWiredData(this.wiredData)) return;

        this.sendWiredData(user);
    }

    public canTrigger(...args: any[]): boolean
    {
        if(!this.wiredData) return false;
        
        if(this.requiresUser)
        {
            if(!(args[0] instanceof User)) return false;
        }
        
        const lastRun = Date.now();

        if((lastRun - (this._lastRun || 0)) < this.cooldown) return false;

        const user = args[0];

        if(user && user instanceof User)
        {
            const existing = this._userLastRuns.get(user.id);

            if(existing)
            {
                if((lastRun - (existing || 0)) < this.cooldownUser) return false;
            }

            this._userLastRuns.set(user.id, lastRun);
        }

        this._lastRun = lastRun;

        return true;
    }

    public onTriggered(...args: any[]): void
    {
        this.processAnimation();
    }

    public saveWiredData(user: IUser, wiredData: FurnitureWiredData): boolean
    {
        if(!user || !wiredData || !this.furniture.room) return false;

        if(!this.furniture.room.security.hasRights(user)) return false;

        if(!wiredData.setFurniture(this.furniture) || !this.validateWiredData(wiredData)) return false;

        this._wiredData = wiredData;

        this.furniture.save();

        this.furniture.room.unit.processComposer(new FurnitureWiredSaveComposer());

        this.cleanUp();

        return true;
    }

    protected validateWiredData(wiredData: FurnitureWiredData): boolean
    {
        if(!wiredData || !this.furniture.room) return false;

        if(wiredData.furnitureIds && wiredData.furnitureIds.length)
        {
            let furnitureIds: number[] = [];

            for(let furnitureId of wiredData.furnitureIds)
            {
                if(furnitureIds.length === wiredData.furnitureLimit) break;

                if(!furnitureId) continue;

                const furniture = this.furniture.room.furniture.getFurniture(furnitureId);

                if(!furniture) continue;

                furnitureIds.push(furniture.id);
            }

            if(wiredData.furnitureIds.sort().join(',') !== furnitureIds.sort().join(','))
            {
                wiredData.furnitureIds = furnitureIds;

                this.furniture.save();
            }
        }

        return true;
    }

    protected getFurniture(): IFurniture[]
    {
        if(!this.furniture || !this.furniture.room || !this.wiredData.furnitureIds || !this.wiredData.furnitureIds.length) return null;

        const furniture: IFurniture[] = [];

        for(let id of this.wiredData.furnitureIds)
        {
            if(!id) continue;

            const item = this.furniture.room.furniture.getFurniture(id);

            if(!item) continue;

            furniture.push(item);
        }

        if(!furniture || !furniture.length) return null;

        return furniture;
    }

    protected getRandomFurniture(): IFurniture
    {
        const furniture = this.getFurniture();

        if(!furniture || !furniture.length) return null;

        const selected = furniture[ furniture.length * Math.random() | 0 ];

        if(!selected) return null;

        return selected;
    }

    protected processAnimation(): void
    {
        this.setState(this.data.state === 1 ? 0 : 1);
    }

    public createWiredData(): FurnitureWiredData
    {
        return new FurnitureWiredData();
    }

    protected sendWiredData(user: IUser): void
    {
        if(!user) return;

        user.processComposer(new this.configComposer(this.wiredData));
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }

    public get wiredType(): number
    {
        return 0;
    }

    public get configComposer(): typeof FurnitureWiredComposer
    {
        return FurnitureWiredComposer;
    }

    public get wiredData(): FurnitureWiredData
    {
        return this._wiredData;
    }

    public get cooldown(): number
    {
        return 50;
    }

    public get cooldownUser(): number
    {
        return 350;
    }

    public get requiresUser(): boolean
    {
        return false;
    }
}