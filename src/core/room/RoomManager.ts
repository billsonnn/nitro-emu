import { DesktopViewComposer, GenericErrorComposer, RoomCreatedComposer, RoomCreateParser, RoomDoorbellCloseComposer, RoomEnterComposer, RoomEnterErrorComposer, RoomInfoComposer, RoomModelNameComposer } from '../../app';
import { NitroManager } from '../../common';
import { RoomDao, RoomEntity, RoomModelDao } from '../../database';
import { INitroCore } from '../interfaces';
import { IUser } from '../user';
import { RoomEnterErrorEnum, RoomGenericErrorEnum, RoomStateEnum } from './enum';
import { IRoom } from './interfaces';
import { RoomModel } from './mapping';
import { Room } from './Room';

export class RoomManager extends NitroManager
{
    private _core: INitroCore;

    private _rooms: Map<number, IRoom>;
    private _models: Map<number, RoomModel>;

    private _pendingRoom: Map<number, number>;
    private _pendingDoorbell: Map<number, number>;
    private _disposeInterval: NodeJS.Timeout;

    constructor(core: INitroCore)
    {
        super();

        this._core              = core;

        this._rooms             = new Map();
        this._models            = new Map();

        this._pendingRoom       = new Map();
        this._pendingDoorbell   = new Map();
        this._disposeInterval   = null;
    }

    protected async onInit(): Promise<void>
    {
        await this.loadModels();

        this._disposeInterval = setInterval(() => this.tryDisposeAll(), 60000);
    }

    protected async onDispose(): Promise<void>
    {
        if(this._disposeInterval) clearInterval(this._disposeInterval);
        
        this._pendingRoom.clear();
        this._pendingDoorbell.clear();
        
        await this.removeAllRooms();
    }

    public async getRoom(id: number): Promise<IRoom>
    {
        if(!id) return null;

        const room = this.getActiveRoom(id);

        if(room) return room;

        return await this.getOfflineRoom(id);
    }

    public getActiveRoom(id: number): IRoom
    {
        if(!id) return null;

        const existing = this._rooms.get(id);

        if(!existing) return null;

        existing.cancelDispose();

        return existing;
    }

    private async getOfflineRoom(id: number): Promise<IRoom>
    {
        if(!id) return null;

        const entity = await RoomDao.loadRoom(id);

        if(!entity) return null;

        const room = new Room(this, entity);

        if(!room) return null;

        return this.addRoom(room);
    }

    public addRoom(room: IRoom): IRoom
    {
        if(!room) return null;

        const existing = this.getActiveRoom(room.id);

        if(existing)
        {
            if(room !== existing) room.dispose();

            return existing;
        }

        this._rooms.set(room.id, room);

        return room;
    }

    public async removeRoom(roomId: number): Promise<void>
    {
        const existing = this.getActiveRoom(roomId);

        if(!existing) return;

        this._rooms.delete(roomId);

        await existing.dispose();
    }

    public async removeAllRooms(): Promise<void>
    {
        if(!this._rooms || !this._rooms.size) return;

        for(let room of this._rooms.values())
        {
            if(!room) continue;

            this._rooms.delete(room.id);

            await room.dispose();
        }
    }

    public tryDisposeAll(): void
    {
        if(!this._rooms || !this._rooms.size) return;
        
        for(let room of this._rooms.values())
        {
            if(!room) continue;

            room.tryDispose();
        }
    }

    public async forceEnterRoom(user: IUser, roomId: number): Promise<void>
    {
        const pendingRoomId = this.getPendingRoomId(user.id);

        if(pendingRoomId === roomId) return;

        this.setPendingRoomId(user.id, roomId);

        user.clearRoomUnit();

        const room = await this.getRoom(roomId);

        if(room) await room.init();

        if(!room || !room.isLoaded)
        {
            this.clearPendingRoom(user.id);

            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.NO_ENTRY));

            return;
        }

        if(room.security.isBanned(user))
        {
            this.clearPendingRoom(user.id);

            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.BANNED));

            return;
        }

        user.processComposer(
            new RoomInfoComposer(room, false, true, room.security.isOwner(user)),
            new RoomModelNameComposer(room.model.name, room.id)
        );

        this.continueEntering(user);
    }

    public async enterRoom(user: IUser, roomId: number, password: string = null, skipState: boolean = false): Promise<void>
    {
        if(!user || !roomId) return;

        const pendingRoomId = this.getPendingRoomId(user.id);

        if(pendingRoomId === roomId) return;

        this.setPendingRoomId(user.id, roomId);

        user.clearRoomUnit();

        const room = await this.getRoom(roomId);

        if(room) await room.init();

        if(!room || !room.isLoaded)
        {
            this.clearPendingRoom(user.id);

            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.NO_ENTRY));

            return;
        }

        if(room.security.isBanned(user))
        {
            this.clearPendingRoom(user.id);

            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.BANNED));

            return;
        }

        if(!room.security.isOwner(user))
        {
            if(room.details.usersNow >= room.details.usersMax)
            {
                this.clearPendingRoom(user.id);
                
                user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.ROOM_FULL));

                return;
            }

            if(!skipState)
            {
                if(room.details.state === RoomStateEnum.LOCKED)
                {
                    this.clearPendingRoom(user.id);
                    
                    room.security.requestDoorbell(user);

                    return;
                }

                else if(room.details.state === RoomStateEnum.PASSWORD)
                {
                    if(password !== room.details.password)
                    {
                        this.clearPendingRoom(user.id);
                
                        user.processComposer(new GenericErrorComposer(RoomGenericErrorEnum.INVALID_PASSWORD));

                        return;
                    }
                }

                else if(room.details.state === RoomStateEnum.INVISIBLE)
                {
                    if(!room.security.hasRights(user))
                    {
                        this.clearPendingRoom(user.id);
                        
                        user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.NO_ENTRY));

                        return;
                    }
                }
            }
        }

        if(room.details.state === RoomStateEnum.LOCKED) user.processComposer(new RoomDoorbellCloseComposer(null));

        user.processComposer(
            new RoomEnterComposer(),
            new RoomModelNameComposer(room.model.name, room.id)
        );
    }

    public async continueEntering(user: IUser): Promise<void>
    {
        if(!user) return;

        const roomId = this.getPendingRoomId(user.id);

        if(!roomId)
        {
            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.NO_ENTRY));
            
            return;
        }

        const room = await this.getRoom(roomId);

        if(room) await room.init();

        if(!room || !room.isLoaded)
        {
            this.clearPendingRoom(user.id);

            user.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.NO_ENTRY));

            return;
        }

        room.enterRoom(user);
    }

    public getPendingRoomId(userId: number): number
    {
        if(!userId) return;

        const existing = this._pendingRoom.get(userId);

        if(!existing) return null;

        return existing;
    }

    public setPendingRoomId(userId: number, roomId: number): void
    {
        if(!userId || !roomId) return;

        this._pendingRoom.set(userId, roomId);
    }

    public clearPendingRoom(userId: number): void
    {
        if(!userId) return;

        this._pendingRoom.delete(userId);
    }

    public setPendingDoorbell(userId: number, roomId: number): void
    {
        if(!userId || !roomId) return;

        this._pendingDoorbell.set(userId, roomId);
    }

    public clearPendingDoorbell(user: IUser): void
    {
        if(!user) return;

        const existing = this._pendingDoorbell.get(user.id);

        if(!existing) return;

        this._pendingDoorbell.delete(user.id);

        const room = this.getActiveRoom(existing);

        if(!room) return;

        room.security.removeDoorbell(user);
    }

    public clearRoomStatus(user: IUser): void
    {
        if(!user) return;

        this.clearPendingDoorbell(user);

        const pendingRoomId = this.getPendingRoomId(user.id);

        if(pendingRoomId) return;

        user.processComposer(new DesktopViewComposer());
    }

    public async createRoom(user: IUser, details: RoomCreateParser): Promise<void>
    {
        if(!user || !details) return;

        const model = this.getModelByName(details.model);

        if(!model) return;

        const category = this._core.navigator.getCategory(details.categoryId);

        if(!category) return;

        const newRoom = new RoomEntity();

        newRoom.name        = details.name;
        newRoom.description = details.description;
        newRoom.ownerId     = user.id;
        newRoom.ownerName   = user.username;
        newRoom.modelId     = model.id;
        newRoom.categoryId  = category.id;
        newRoom.usersMax    = details.usersMax;
        newRoom.tradeType   = details.tradeType;

        await this._core.database.entityManager.save(newRoom);

        user.processComposer(new RoomCreatedComposer(newRoom.id, newRoom.name));
    }

    public async deleteRoom(user: IUser, roomId: number): Promise<void>
    {
        if(!user || !roomId) return;

        const room = await this.getRoom(roomId);

        if(!room) return;

        if(!room.security.isOwner(user)) return;

        await this.removeRoom(room.id);

        await RoomDao.deleteRoom(roomId);
    }

    public getModel(id: number): RoomModel
    {
        if(!id) return null;

        const existing = this._models.get(id);

        if(!existing) return null;

        return existing;
    }

    public getModelByName(name: string): RoomModel
    {
        if(!name) return null;

        if(!this._models.size) return null;

        for(let model of this._models.values())
        {
            if(!model) continue;

            if(model.name !== name) continue;

            return model;
        }

        return null;
    }

    private async loadModels(): Promise<void>
    {
        this._models.clear();

        const results = await RoomModelDao.loadModels();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const model = new RoomModel(result);

                if(!model.didGenerate)
                {
                    this.logger.warn(`Model: ${ result.id }:${ result.name } could not be generated`);

                    continue;
                }

                this._models.set(model.id, model);
            }
        }

        this.logger.log(`Loaded ${ this._models.size } models`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get rooms(): Map<number, IRoom>
    {
        return this._rooms;
    }

    public get models(): Map<number, RoomModel>
    {
        return this._models;
    }
}