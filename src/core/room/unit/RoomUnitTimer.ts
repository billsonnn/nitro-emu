import { IRoomUnitController, IRoomUnitTimer } from './interfaces';

export class RoomUnitTimer implements IRoomUnitTimer
{
    private static LOOK_TIMER_MILLISECONDS: number  = 4000;
    private static IDLE_TIMER_MILLISECONDS: number  = 600000;

    private _unit: IRoomUnitController;

    private _idleTimer: NodeJS.Timeout;
    private _lookTimer: NodeJS.Timeout;
    
    constructor(unit: IRoomUnitController)
    {
        if(!unit) throw new Error('invalid_unit');

        this._unit              = unit;

        this._idleTimer         = null;
        this._lookTimer         = null;
    }

    public init(): void
    {
        this.startIdleTimer();
    }

    public dispose(): void
    {
        this.stopIdleTimer();
        this.stopLookTimer();
    }

    public startIdleTimer(): void
    {
        this.stopIdleTimer();

        this._idleTimer = setTimeout(() =>
        {
            this._unit.location.idle(true);
        }, RoomUnitTimer.IDLE_TIMER_MILLISECONDS);
    }

    public startLookTimer(): void
    {
        this.stopLookTimer();

        this._lookTimer = setTimeout(() =>
        {
            this._unit.location.position.headRotation = this._unit.location.position.rotation;

            this._unit.needsUpdate = true;
        }, RoomUnitTimer.LOOK_TIMER_MILLISECONDS);
    }

    public stopIdleTimer(): void
    {
        if(!this._idleTimer) return;

        clearTimeout(this._idleTimer);

        this._idleTimer = null;
    }

    public stopLookTimer(): void
    {
        if(!this._lookTimer) return;

        clearTimeout(this._lookTimer);

        this._lookTimer = null;
    }

    public get unit(): IRoomUnitController
    {
        return this._unit;
    }
}