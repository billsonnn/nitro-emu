import { IUser } from '../../../../../user';
import { FurnitureWiredData } from '../data';
import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerPeriodicallyLongLogic extends FurnitureWiredTriggerLogic
{
    private static INTERVAL_PARAMETER: number = 0;

    private _interval: NodeJS.Timeout;

    constructor()
    {
        super();

        this._interval = null;
    }

    protected cleanUp(): void
    {
        this.stopTriggering();

        super.cleanUp();
    }

    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;
        
        return true;
    }

    public onReady(): boolean
    {
        if(!super.onReady()) return false;

        this.startTriggering();

        return true;
    }

    private startTriggering(): void
    {
        this.stopTriggering();

        let interval = (this.wiredData && this.wiredData.intParameters[FurnitureWiredTriggerPeriodicallyLongLogic.INTERVAL_PARAMETER]) || 1;

        interval = (interval < 1 ? 1 : interval) * this.multiplier;

        this._interval = setInterval(() =>
        {
            if(!this.furniture || !this.furniture.room) return;

            this.furniture.room.wired.processTrigger(this.furniture);
        }, interval);
    }

    private stopTriggering(): void
    {
        if(!this._interval) return;

        clearInterval(this._interval);

        this._interval = null;
    }

    public saveWiredData(user: IUser, wiredData: FurnitureWiredData): boolean
    {
        if(!super.saveWiredData(user, wiredData)) return false;

        this.startTriggering();

        return true;
    }

    public get multiplier(): number
    {
        return 5000;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.TRIGGER_PERIODICALLY_LONG;
    }
}