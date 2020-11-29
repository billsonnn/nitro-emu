import { NitroManager } from '../../common';
import { BotEntity } from '../../database';
import { IRoom, IRoomUnitController } from '../room';
import { BotDetails } from './BotDetails';
import { IBot } from './interfaces';

export class Bot extends NitroManager implements IBot
{
    private _id: number;
    private _details: BotDetails;

    private _room: IRoom;
    private _roomUnit: IRoomUnitController;

    constructor(entity: BotEntity)
    {
        super();

        if(!(entity instanceof BotEntity)) throw new Error('invalid_entity');

        this._id            = entity.id;
        this._details       = new BotDetails(this, entity);

        this._room          = null;
        this._roomUnit      = null;

        this.logger.description = this._id;
    }

    protected async onDispose(): Promise<void>
    {
        this.clearRoomUnit();

        if(this._room) this._room.bot.removeBot(this._id);

        if(this._details) await this._details.saveNow();

        this.logger.log(`Disposed`);
    }

    public setRoomUnit(unit: IRoomUnitController): boolean
    {
        this.clearRoomUnit();

        if(!unit.setHolder(this)) return false;

        this._roomUnit = unit;

        return true;
    }

    public clearRoomUnit(): void
    {
        if(this._roomUnit)
        {
            //this._details.savePosition(this._roomUnit.location.position.copy());

            this._roomUnit.dispose();

            this._roomUnit = null;
        }
    }

    public setRoom(room: IRoom): boolean
    {
        if(!room) return false;

        if(this._room && (this._room !== room)) return false;

        this._room = room;

        this._details.setRoomId(room.id);

        return true;
    }

    public clearRoom(): void
    {
        this._room = null;

        this._details.clearRoomId();
    }

    public get id(): number
    {
        return this._id;
    }
    
    public get details(): BotDetails
    {
        return this._details;
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get roomUnit(): IRoomUnitController
    {
        return this._roomUnit;
    }

    public get username(): string
    {
        return this._details.name;
    }

    public get motto(): string
    {
        return this._details.motto;
    }

    public get figure(): string
    {
        return this._details.figure;
    }

    public get gender(): string
    {
        return this._details.gender;
    }
}