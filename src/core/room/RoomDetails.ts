import { RoomChatSettingsComposer, RoomPaintComposer, RoomSettingsErrorComposer, RoomSettingsSavedComposer, RoomSettingsSaveParser, RoomSettingsUpdatedComposer, RoomThicknessComposer } from '../../app';
import { TimeHelper } from '../../common';
import { RoomEntity } from '../../database';
import { IUser } from '../user';
import { RoomPaintEnum, RoomSettingsErrorEnum, RoomStateEnum } from './enum';
import { IRoom } from './interfaces';
import { RoomModel } from './mapping';

export class RoomDetails
{
    private _room: IRoom;
    private _entity: RoomEntity;

    private _totalLikes: number;

    constructor(room: IRoom, entity: RoomEntity)
    {
        if(!room) throw new Error('invalid_room');

        if(!(entity instanceof RoomEntity)) throw new Error('invalid_entity');

        this._room          = room;
        this._entity        = entity;

        //@ts-ignore
        this._totalLikes    = entity.totalLikes || 0;
    }

    public save(): void
    {
        this._room.manager.core.database.queue.queueEntity(this._entity);
        
        return;
    }

    public async saveNow(): Promise<void>
    {
        await this._room.manager.core.database.queue.processNow(this._entity);
    }

    public setUsersNow(count: number): void
    {
        this._entity.usersNow = count;

        this._entity.lastActive = TimeHelper.now;

        this.save();
    }

    public setWallType(type: string): void
    {
        if(type === this._entity.paintWall) return;
        
        this._entity.paintWall = type;

        this.save();

        this._room.unit.processComposer(new RoomPaintComposer(RoomPaintEnum.WALLPAPER, type));
    }

    public setFloorType(type: string): void
    {
        if(type === this._entity.paintFloor) return;
        
        this._entity.paintFloor = type;

        this.save();

        this._room.unit.processComposer(new RoomPaintComposer(RoomPaintEnum.FLOOR, type));
    }

    public setLandscapeType(type: string): void
    {
        if(type === this._entity.paintLandscape) return;
        
        this._entity.paintLandscape = type;

        this.save();

        this._room.unit.processComposer(new RoomPaintComposer(RoomPaintEnum.LANDSCAPE, type));
    }

    public setModel(model: RoomModel): void
    {
        if(!model) return null;

        this._entity.modelId = model.id;

        //this._room.loadMapping();

        //this._room.map.generateMap();
    }

    public setName(name: string)
    {
        this._entity.name = name;

        this.save();
    }

    public saveSettings(user: IUser, parser: RoomSettingsSaveParser): Promise<void>
    {
        if(!user || !parser) return;

        if(!this._room.security.isOwner(user)) return;

        if(!parser.name)
        {
            user.processComposer(new RoomSettingsErrorComposer(this._room.id, RoomSettingsErrorEnum.INVALID_NAME, ''));

            return;
        }

        if(parser.state === RoomStateEnum.PASSWORD && !parser.password)
        {
            user.processComposer(new RoomSettingsErrorComposer(this._room.id, RoomSettingsErrorEnum.INVALID_PASSWORD, ''));

            return;
        }

        this._entity.name               = parser.name;
        this._entity.description        = parser.description;
        this._entity.state              = parser.state;
        this._entity.password           = parser.password;
        this._entity.usersMax           = parser.usersMax;
        this._entity.categoryId         = parser.categoryId;
        this._entity.tradeType          = parser.tradeType;
        this._entity.allowPets          = parser.allowPets ? 1 : 0;
        this._entity.allowPetsEat       = parser.allowPetsEat ? 1 : 0;
        this._entity.allowWalkThrough   = parser.allowWalkThrough ? 1 : 0;
        this._entity.hideWalls          = parser.hideWalls ? 1 : 0;
        this._entity.thicknessWall      = parser.thicknessWall;
        this._entity.thicknessFloor     = parser.thicknessFloor;
        this._entity.allowMute          = parser.muteType;
        this._entity.allowKick          = parser.kickType;
        this._entity.allowBan           = parser.banType;
        this._entity.chatMode           = parser.chatMode;
        this._entity.chatWeight         = parser.chatWeight;
        this._entity.chatSpeed          = parser.chatSpeed;
        this._entity.chatDistance       = parser.chatDistance;
        this._entity.chatProtection     = parser.chatProtection;

        this._room.unit.processComposer(
            new RoomThicknessComposer(this._room),
            new RoomChatSettingsComposer(this._room),
            new RoomSettingsUpdatedComposer(this._room.id)
        );

        user.processComposer(new RoomSettingsSavedComposer(this._room.id));

        this.save();
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get entity(): RoomEntity
    {
        return this._entity;
    }

    public get ownerId(): number
    {
        return this._entity.ownerId;
    }

    public get ownerName(): string
    {
        return this._entity.ownerName;
    }

    // public get groupId(): number
    // {
    //     return this._entity.group ? this._entity.group.id : 0;
    // }

    public get name(): string
    {
        return this._entity.name;
    }

    public get description(): string
    {
        return this._entity.description;
    }

    public get state(): number
    {
        return this._entity.state;
    }

    public get password(): string
    {
        return this._entity.password;
    }

    public get modelId(): number
    {
        return this._entity.modelId;
    }

    public get categoryId(): number
    {
        return this._entity.categoryId || 0;
    }

    public get usersNow(): number
    {
        return this._entity.usersNow;
    }

    public get usersMax(): number
    {
        return this._entity.usersMax;
    }

    public get tradeType(): number
    {
        return this._entity.tradeType;
    }

    public get paintWall(): string
    {
        return this._entity.paintWall;
    }

    public get paintFloor(): string
    {
        return this._entity.paintFloor;
    }

    public get paintLandscape(): string
    {
        return this._entity.paintLandscape;
    }

    public get wallHeight(): number
    {
        return this._entity.wallHeight;
    }

    public get hideWalls(): boolean
    {
        return this._entity.hideWalls === 1;
    }

    public get thicknessWall(): number
    {
        return this._entity.thicknessWall;
    }

    public get thicknessFloor(): number
    {
        return this._entity.thicknessFloor;
    }

    public get allowEditing(): boolean
    {
        return this._entity.allowEditing === 1;
    }

    public get allowPets(): boolean
    {
        return this._entity.allowPets === 1;
    }

    public get allowPetsEat(): boolean
    {
        return this._entity.allowPetsEat === 1;
    }

    public get allowMute(): number
    {
        return this._entity.allowMute;
    }

    public get allowKick(): number
    {
        return this._entity.allowKick;
    }

    public get allowBan(): number
    {
        return this._entity.allowBan;
    }

    public get allowWalkThrough(): boolean
    {
        return this._entity.allowWalkThrough === 1;
    }

    public get chatMode(): number
    {
        return this._entity.chatMode;
    }

    public get chatWeight(): number
    {
        return this._entity.chatWeight;
    }

    public get chatSpeed(): number
    {
        return this._entity.chatSpeed;
    }

    public get chatDistance(): number
    {
        return this._entity.chatDistance;
    }

    public get chatProtection(): number
    {
        return this._entity.chatProtection;
    }

    public get lastActive(): Date
    {
        return this._entity.lastActive;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }

    public get totalLikes(): number
    {
        return this._totalLikes || 0;
    }

    public set totalLikes(count: number)
    {
        this._totalLikes = count;
    }
}