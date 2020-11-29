import { NitroManager } from '../../../../common';
import { UserOutfitDao } from '../../../../database';
import { IUser } from '../../interfaces';
import { UserOutfit } from './UserOutfit';

export class UserOutfits extends NitroManager
{
    private _user: IUser;
    private _outfits: Map<number, UserOutfit>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user      = user;
        this._outfits   = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadOutfits();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;
        
        this._outfits.clear();
    }

    public async addOutfit(figure: string, gender: string, slotNumber: number): Promise<void>
    {
        if(!figure || !gender || (slotNumber <= 0 || slotNumber > 6)) return;

        const entity = await UserOutfitDao.addOutfit(this._user.id, figure, gender, slotNumber);

        if(!entity) return;

        const outfit = new UserOutfit(entity);

        if(!outfit) return;

        this._outfits.set(outfit.slot, outfit);
    }

    private async loadOutfits(): Promise<void>
    {
        this._outfits.clear();

        const results = await UserOutfitDao.loadUserOutfits(this._user.id);

        if(results)
        {
            for(let result of results)
            {
                if(!result || (result.slotNumber <= 0 || result.slotNumber > 6)) continue;

                const outfit = new UserOutfit(result);

                if(!outfit) continue;

                this._outfits.set(outfit.slot, outfit);
            }
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get outfits(): Map<number, UserOutfit>
    {
        return this._outfits;
    }
}