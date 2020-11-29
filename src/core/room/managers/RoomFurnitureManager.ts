import { FurnitureFloorComposer, FurnitureFloorUpdateComposer } from '../../../app';
import { NitroManager, Position } from '../../../common';
import { FurnitureDao } from '../../../database';
import { Furniture, FurnitureDefinitionType, FurnitureLogic, IFurniture } from '../../furniture';
import { IUser, NotificationMessage, NotificationTypeEnum } from '../../user';
import { IRoom } from '../interfaces';

export class RoomFurnitureManager extends NitroManager
{
    private _room: IRoom;

    private _furniture: Map<number, IFurniture>;
    private _owners: Map<number, string>;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room      = room;

        this._furniture = new Map();
        this._owners    = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadFurniture();
    }
    
    protected async onDispose(): Promise<void>
    {
        if(this._furniture && this._furniture.size)
        {
            for(let furniture of this._furniture.values())
            {
                if(!furniture) continue;

                this._furniture.delete(furniture.id);

                furniture.dispose();
            }
        }
        
        this._owners.clear();
    }

    public getFurniture(id: number): IFurniture
    {
        const existing = this._furniture.get(id);

        if(!existing) return null;

        return existing;
    }

    public getFurnitureByType(type: string): IFurniture[]
    {
        if(!type) return null;

        if(!this._furniture.size) return null;

        const results: IFurniture[] = [];

        for(let furniture of this._furniture.values())
        {
            if(!furniture || !furniture.logic) continue;

            if(furniture.logic.definition.type !== type) continue;

            results.push(furniture);
        }

        if(!results || !results.length) return null;

        return results;
    }

    public getFurnitureByLogic(logicType: typeof FurnitureLogic): IFurniture[]
    {
        if(!logicType) return null;

        if(!this._furniture.size) return null;

        const results: IFurniture[] = [];

        for(let furniture of this._furniture.values())
        {
            if(!furniture || !furniture.logic) continue;

            if(!(furniture.logic instanceof logicType)) continue;

            results.push(furniture);
        }

        if(!results || !results.length) return null;

        return results;
    }

    public sendAllFurniture(user: IUser): void
    {
        if(!user) return;

        let results: IFurniture[]   = [];
        let count: number           = 0;

        for(let furniture of this._furniture.values())
        {
            if(!furniture) continue;

            results.push(furniture);
            count++;

            if(count === 250)
            {
                user.processComposer(new FurnitureFloorComposer(this._owners.entries(), results));

                results = [];
                count   = 0;
            }
        }

        if(count > 0)
        {
            user.processComposer(new FurnitureFloorComposer(this._owners.entries(), results));

            results = [];
            count   = 0;
        }
    }

    public addFurniture(user: IUser, itemId: number, position: Position): void
    {
        if(!user || !user.inventory || !itemId || !position) return;

        const existing = this.getFurniture(itemId);

        if(existing) return user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.ITEM_EXISTS);

        if(!this._room.security.hasRights(user)) return user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.NO_RIGHTS);

        const furniture = user.inventory.furniture.getFurniture(itemId);

        if(!furniture || !furniture.logic) return user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.INVALID_ITEM);

        if(furniture.logic.definition.type === FurnitureDefinitionType.FLOOR)
        {
            if(!furniture.isValidPlacement(position, this._room) || !furniture.setRoom(this._room)) return user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.INVALID_PLACEMENT);

            furniture.position.setRotation(position.rotation);

            furniture.position.x = position.x;
            furniture.position.y = position.y;

            const tile = this._room.map.getHighestTileForFurniture(furniture);

            if(tile && ((tile.highestItem !== furniture) || tile.hasStackHelper)) furniture.position.z = tile.tileHeight;
        }

        furniture.logic.onPlace(user);

        this._furniture.set(furniture.id, furniture);
            
        this._owners.set(user.id, user.username);

        user.inventory.furniture.removeFurniture(furniture);

        furniture.save();

        if(!furniture.logic.onReady()) return;

        this._room.map.addFurniture(furniture);
    }

    public moveFurniture(user: IUser, itemId: number, position: Position, maintainHeight: boolean = false, skipChecks: boolean = false, sendUpdate: boolean = true): boolean
    {
        if(!itemId || !position) return false;

        const furniture = this.getFurniture(itemId);

        if(!furniture || !furniture.logic) return false;

        if(furniture.logic.definition.type === FurnitureDefinitionType.FLOOR)
        {
            if(!skipChecks)
            {
                if(!user || !this._room.security.hasRights(user))
                {
                    user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.INVALID_PLACEMENT);

                    user.processComposer(new FurnitureFloorUpdateComposer(furniture));

                    return false;
                }
            }

            if(!furniture.isValidPlacement(position, this._room))
            {
                if(user)
                {
                    user.notification.sendNotification(NotificationTypeEnum.FURNI_PLACEMENT_ERROR, NotificationMessage.INVALID_PLACEMENT);

                    user.processComposer(new FurnitureFloorUpdateComposer(furniture));
                }

                return false;
            }

            const oldPosition = furniture.position.copy();

            furniture.position.setRotation(position.rotation);

            furniture.position.x = position.x;
            furniture.position.y = position.y;

            const tile = this._room.map.getHighestTileForFurniture(furniture);

            if(tile && ((tile.highestItem !== furniture) || tile.hasStackHelper)) furniture.position.z = tile.tileHeight;

            furniture.logic.onMove(user);

            this._room.map.moveFurniture(furniture, oldPosition, sendUpdate);

            furniture.save();
        }

        return true;
    }

    public removeFurniture(user: IUser, ...ids: number[]): void
    {
        if(!user) return;

        ids = [ ...ids ];

        if(!ids || !ids.length) return;

        const canRemove = this._room.security.isOwner(user);

        const floorRemoved: IFurniture[]    = [];
        const ownItems: IFurniture[]        = [];

        for(let id of ids)
        {
            if(!id) continue;

            const furniture = this.getFurniture(id);

            if(!furniture || !furniture.logic) continue;

            if(!canRemove && (furniture.userId !== user.id)) continue;

            if(furniture.logic.definition.type === FurnitureDefinitionType.FLOOR)
            {
                floorRemoved.push(furniture);
            }

            else if(furniture.logic.definition.type === FurnitureDefinitionType.WALL)
            {

            }

            if(furniture.userId === user.id) ownItems.push(furniture);
            else
            {
                const activeUser = this._room.manager.core.user.getUserById(furniture.userId);

                if(activeUser && activeUser.inventory && activeUser.inventory.furniture) activeUser.inventory.furniture.addFurniture(furniture)
                else furniture.clearRoom();
            }

            furniture.logic.onPickup(user);

            this._furniture.delete(furniture.id);
        }

        if(ownItems && ownItems.length) user.inventory.furniture.addFurniture(...floorRemoved);

        if(floorRemoved && floorRemoved.length) this._room.map.removeFurniture(...floorRemoved);
    }

    private async loadFurniture(): Promise<void>
    {
        this._furniture.clear();

        const results = await FurnitureDao.loadRoomFurniture(this._room.id);

        if(results && results.length)
        {
            for(let result of results)
            {
                if(!result) continue;

                try
                {
                    const furniture = new Furniture(this._room.manager.core.furniture, result);

                    if(!furniture || !furniture.setRoom(this._room)) continue;

                    this._furniture.set(furniture.id, furniture);

                    if(this._owners.get(furniture.userId) !== undefined) continue;

                    this._owners.set(result.userId, (result.user && result.user.username) || null);
                }

                catch(err)
                {
                    this.logger.error(err.message || err, err.stack);
                }
            }
        }

        if(this._furniture && this._furniture.size)
        {
            for(let furniture of this._furniture.values())
            {
                if(!furniture || !furniture.logic) continue;

                if(!furniture.logic.onReady()) continue;

                this._room.map.addFurniture(furniture);
            }
        }
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get furniture(): Map<number, IFurniture>
    {
        return this._furniture;
    }

    public get owners(): Map<number, string>
    {
        return this._owners;
    }
}