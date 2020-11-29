import { NitroManager } from '../../../common';
import { IRoom } from '../interfaces';
import { RoomRollerTask } from './RoomRollerTask';
import { RoomUnitStatusTask } from './RoomUnitStatusTask';

export class RoomTaskManager extends NitroManager
{
    private static UNIT_STATUS_TICK: number = 500;
    private static ROLLER_TICK: number      = 2000;

    private _room: IRoom;
    private _statusTask: RoomUnitStatusTask;
    private _rollerTask: RoomRollerTask;

    private _statusInterval: NodeJS.Timeout;
    private _rollerInterval: NodeJS.Timeout;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room          = room;

        this._statusTask    = new RoomUnitStatusTask(this._room);
        this._rollerTask    = new RoomRollerTask(this._room);
    }

    protected onInit(): void
    {
        this._statusInterval = setInterval(() => this._statusTask.run(), RoomTaskManager.UNIT_STATUS_TICK);
        this._rollerInterval = setInterval(() => this._rollerTask.run(), RoomTaskManager.ROLLER_TICK);
    }

    protected onDispose(): void
    {
        if(this._statusInterval) clearInterval(this._statusInterval);

        if(this._rollerInterval) clearInterval(this._rollerInterval);
    }

    public get room(): IRoom
    {
        return this._room;
    }
}