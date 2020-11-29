import { Application, RoomUnitInfoComposer } from '../../app';
import { Position } from '../../common';
import { BotEntity } from '../../database';
import { IUser } from '../user';
import { IBot } from './interfaces';

export class BotDetails
{
    private _bot: IBot;
    private _entity: BotEntity;

    private _ownerName: string;

    constructor(bot: IBot, entity: BotEntity)
    {
        if(!bot) throw new Error('invalid_bot');
        
        if(!(entity instanceof BotEntity)) throw new Error('invalid_entity');

        this._bot       = bot;
        this._entity    = entity;

        this._ownerName = (entity.user && entity.user.username) || null;
    }

    public save(queue: boolean = true): void
    {
        if(queue) Application.instance.core.database.queue.queueEntity(this._entity);
    }

    public async saveNow(): Promise<void>
    {
        this.save(false);

        await Application.instance.core.database.queue.processNow(this._entity);
    }

    public savePosition(position: Position): void
    {
        if(!position) return;

        this._entity.x          = position.x || 0;
        this._entity.y          = position.y || 0;
        this._entity.z          = position.z || 0;
        this._entity.direction  = position.rotation || 0;

        this.save();
    }

    public updateFigure(figure: string, gender: string): void
    {
        if(!figure || !gender) return;
        
        this._entity.figure = figure;
        this._entity.gender = gender === 'M' ? 'M' : 'F';

        this.save();

        if(this._bot.roomUnit) this._bot.roomUnit.manager.processComposer(new RoomUnitInfoComposer(this._bot.roomUnit));
    }

    public updateMotto(motto: string): void
    {
        this._entity.motto = motto || '';
        
        this.save();

        if(this._bot.roomUnit) this._bot.roomUnit.manager.processComposer(new RoomUnitInfoComposer(this._bot.roomUnit));
    }

    public setOwner(user: IUser): boolean
    {
        if(!user) return false;

        this._ownerName = user.username;

        if(this._entity.userId !== user.id)
        {
            this._entity.userId = user.id;

            this.save();
        }

        return true;
    }
    
    public setRoomId(roomId: number): void
    {
        if(!roomId) return;

        if(this._entity.roomId === roomId) return;

        this._entity.roomId = roomId;

        this.save();
    }

    public clearRoomId(): void
    {
        this._entity.roomId = null;

        this.save();
    }

    public get bot(): IBot
    {
        return this._bot;
    }

    public get entity(): BotEntity
    {
        return this._entity;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get userId(): number
    {
        return this._entity.userId;
    }

    public get ownerName(): string
    {
        return this._entity.user.username;
    }

    public get roomId(): number
    {
        return this._entity.roomId;
    }

    public get name(): string
    {
        return this._entity.name;
    }

    public get motto(): string
    {
        return this._entity.motto || '';
    }

    public get gender(): string
    {
        return this._entity.gender;
    }

    public get figure(): string
    {
        return this._entity.figure;
    }

    public set figure(figure: string)
    {
        this._entity.figure = figure;

        this.save();
    }

    public get x(): number
    {
        return this._entity.x;
    }

    public get y(): number
    {
        return this._entity.y;
    }

    public get z(): number
    {
        return this._entity.z;
    }

    public get direction(): number
    {
        return this._entity.direction;
    }

    public get dance(): number
    {
        return this._entity.x;
    }

    public get freeRoam(): boolean
    {
        return this._entity.freeRoam === 1;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }
}