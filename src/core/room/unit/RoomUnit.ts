import { Disposable } from '../../../common';
import { Bot, RentableBot } from '../../bot';
import { User } from '../../user';
import { RoomChatEnum } from '../enum';
import { RoomUnitManager } from '../managers';
import { RoomRollerData } from '../RoomRollerData';
import { RoomUnitTypeEnum } from './enums';
import { IRoomUnitController, IRoomUnitHolder, IRoomUnitLocation, IRoomUnitTimer } from './interfaces';
import { RoomUnitLocation } from './RoomUnitLocation';
import { RoomUnitTimer } from './RoomUnitTimer';

export class RoomUnit extends Disposable implements IRoomUnitController
{
    private _id: number;
    private _type: number;
    private _manager: RoomUnitManager;

    private _holder: IRoomUnitHolder;
    private _location: IRoomUnitLocation;
    private _timer: IRoomUnitTimer;

    private _rollerData: RoomRollerData;

    private _needsUpdate: boolean;

    constructor(id: number, manager: RoomUnitManager)
    {
        super();

        this._id            = id;
        this._type          = -1;
        this._manager       = manager;

        this._holder        = null;
        this._location      = new RoomUnitLocation(this);
        this._timer         = new RoomUnitTimer(this);

        this._rollerData    = null;

        this._needsUpdate   = false;
    }

    protected onDispose(): void
    {
        this._manager.removeUnit(this._id);

        if(this._rollerData)
        {
            this._rollerData.removeUnit(this);

            this._rollerData = null;
        }

        if(this._location)
        {
            this._location.dispose();

            this._location = null;
        }

        if(this._timer)
        {
            this._timer.dispose();

            this._timer = null;
        }

        if(this._holder)
        {
            this._holder.clearRoomUnit();

            this._holder = null;
        }

        this._id            = -1;
        this._manager       = null;
    }

    public ready(): void
    {
        if(this._timer) this._timer.init();
    }

    public chat(type: RoomChatEnum, message: string): void
    {
        if(!message || !message.length) return;

        this._manager.chat(this, type, message);
    }

    public setHolder(holder: IRoomUnitHolder): boolean
    {
        if(!holder) return false;

        if(holder instanceof User)
        {
            this._type      = RoomUnitTypeEnum.USER;
            this._holder    = holder;

            return true;
        }

        else if(holder instanceof RentableBot)
        {
            this._type      = RoomUnitTypeEnum.RENTABLE_BOT;
            this._holder    = holder;

            return true;
        }

        else if(holder instanceof Bot)
        {
            this._type      = RoomUnitTypeEnum.BOT;
            this._holder    = holder;

            return true;
        }

        return false;
    }

    public setRollerData(rollerData: RoomRollerData = null): void
    {
        if(this._rollerData)
        {
            this._rollerData.removeUnit(this);

            this._rollerData = null;
        }
        
        this._rollerData = rollerData;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): number
    {
        return this._type;
    }

    public get manager(): RoomUnitManager
    {
        return this._manager;
    }

    public get holder(): IRoomUnitHolder
    {
        return this._holder;
    }

    public get location(): IRoomUnitLocation
    {
        return this._location;
    }

    public get timer(): IRoomUnitTimer
    {
        return this._timer;
    }

    public get rollerData(): RoomRollerData
    {
        return this._rollerData;
    }

    public get needsUpdate(): boolean
    {
        return this._needsUpdate;
    }

    public set needsUpdate(flag: boolean)
    {
        this._needsUpdate = flag;
    }
}