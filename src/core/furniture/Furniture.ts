import { AffectedPositions, Disposable, Position } from '../../common';
import { FurnitureEntity } from '../../database';
import { IRoom, RoomRollerData, RoomTile } from '../room';
import { IUser } from '../user';
import { IFurniture, IFurnitureManager } from './interfaces';
import { FurnitureLogicFactory, FurnitureRollerLogic, FurnitureStackHelperLogic, FurnitureWiredLogic, IFurnitureLogic } from './logic';

export class Furniture extends Disposable implements IFurniture
{
    public static MAX_FURNITURE_Z: number = 40;

    private _manager: IFurnitureManager;
    private _entity: FurnitureEntity;
    private _logic: IFurnitureLogic;

    private _room: IRoom;
    private _position: Position;
    private _wallPosition: string;
    private _rollerData: RoomRollerData;

    private _ownerName: string;

    constructor(manager: IFurnitureManager, entity: FurnitureEntity)
    {
        super();
        
        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof FurnitureEntity)) throw new Error('invalid_entity');

        this._manager       = manager;
        this._entity        = entity;
        this._logic         = null;

        this._ownerName     = (entity.user && entity.user.username) || null;

        this._room          = null;
        this._position      = new Position(this._entity.x, this._entity.y, this._entity.z, this._entity.direction);
        this._wallPosition  = entity.wallPosition;
        this._rollerData    = null;

        if(!this.setLogic()) throw new Error('invalid_logic');
    }

    protected onDispose(): void
    {
        if(this._logic)
        {
            this._logic.dispose();

            this._logic = null;
        }

        this._rollerData = null;
    }
    
    private setLogic(): boolean
    {
        if(this._logic) return true;

        const definition = this._manager.getDefinition(this._entity.definitionId);

        if(!definition) return false;

        const logic = FurnitureLogicFactory.createLogicInstance(definition.logicType);

        if(!logic) return false;

        logic.setFurniture(this);

        if(!logic.initialize(definition)) return false;

        this._logic = logic;

        return true;
    }

    public save(queue: boolean = true): void
    {
        this._entity.x          = this._position.x || 0;
        this._entity.y          = this._position.y || 0;
        this._entity.z          = this._position.z || 0;
        this._entity.direction  = this._position.rotation || 0;
        this._entity.extraData  = JSON.stringify((this._logic && this._logic.data.getAsObject()) || null);

        if(this._logic instanceof FurnitureWiredLogic)
        {
            this._entity.wiredData = JSON.stringify((this._logic && this._logic.wiredData && this._logic.wiredData.getAsObject()) || null);
        }

        if(queue) this._manager.core.database.queue.queueEntity(this._entity);
    }

    public async saveNow(): Promise<void>
    {
        this.save(false);
        
        await this._manager.core.database.queue.processNow(this._entity);
    }

    public setRollerData(rollerData: RoomRollerData = null): void
    {
        if(this._rollerData)
        {
            this._rollerData.removeFurniture(this);

            this._rollerData = null;
        }
        
        this._rollerData = rollerData;
    }

    public setRoom(room: IRoom): boolean
    {
        if(!room) return false;

        if(this._room && (this._room !== room)) return false;

        this._room = room;

        if(this._entity.roomId !== room.id)
        {
            this._entity.roomId = room.id;

            this.save();
        }

        return true;
    }

    public clearRoom(): void
    {
        if(this._rollerData)
        {
            this._rollerData.removeFurniture(this);

            this._rollerData = null;
        }

        this._room          = null;
        this._entity.roomId = null;

        this.save();
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

    public canPlaceOnTop(furniture: IFurniture): boolean
    {
        if(!furniture || !furniture.logic) return false;

        if(this._logic instanceof FurnitureStackHelperLogic) return true;

        if(this._logic instanceof FurnitureRollerLogic) return false;

        if(!furniture.logic.isFurnitureStackable()) return false;

        if(furniture.logic.isFurnitureSittable() || furniture.logic.isFurnitureLayable()) return false;

        if(furniture.logic instanceof FurnitureRollerLogic)
        {
            if((this._logic.definition.width > 1) || (this._logic.definition.length > 1)) return false;
        }

        return true;
    }

    public isValidPlacement(position: Position, room: IRoom = null): boolean
    {
        if(!position) return false;

        room = room !== null ? room : this._room;

        const isRotating        = this._position && this._position.rotation !== position.rotation;
        const affectedPositions = AffectedPositions.getPositions(this, position);

        if(!affectedPositions || !affectedPositions.length) return false;

        for(let position of affectedPositions)
        {
            if(!position) continue;

            const tile = room.map.getTile(position);

            if(!tile) return false;

            if(tile.units.size && !this._logic.isFurnitureWalkable()) return false;

            if((tile.tileHeight + this._logic.furnitureStackHeight()) > Furniture.MAX_FURNITURE_Z) return false;

            if(tile.hasStackHelper) continue;

            const highestItem = tile.highestItem;

            if(highestItem)
            {
                if(isRotating && highestItem === this) continue;

                if((highestItem !== this) && !this.canPlaceOnTop(highestItem)) return false;
            }
        }

        return true;
    }

    public getTile(): RoomTile
    {
        return this._room && this._room.map && this._room.map.getTile(this._position) || null;
    }

    public getTiles(): RoomTile[]
    {
        if(!this._room || !this._room.map) return null;

        const affectedPositions = this.getPositions();

        if(!affectedPositions || !affectedPositions.length) return null;

        const tiles: RoomTile[] = [];

        for(let position of affectedPositions)
        {
            if(!position) continue;

            const tile = this._room.map.getTile(position);

            if(!tile) continue;

            tiles.push(tile);
        }

        if(!tiles || !tiles.length) return null;

        return tiles;
    }

    public getPositions(): Position[]
    {
        return AffectedPositions.getPositions(this);
    }

    public get manager(): IFurnitureManager
    {
        return this._manager;
    }

    public get logic(): IFurnitureLogic
    {
        return this._logic;
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get position(): Position
    {
        return this._position;
    }

    public set position(position: Position)
    {
        this._position = position;
    }

    public get rollerData(): RoomRollerData
    {
        return this._rollerData;
    }

    public get height(): number
    {
        return (this._position.z + ((this.logic && this.logic.furnitureStackHeight()) || 0));
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get roomId(): number
    {
        return this._entity.roomId;
    }

    public get userId(): number
    {
        return this._entity.userId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get wallPosition(): string
    {
        return this._entity.wallPosition;
    }

    public get extraData(): string
    {
        return this._entity.extraData;
    }

    public set extraData(data: string)
    {
        if(this._entity.extraData === data) return;

        this._entity.extraData = data;

        this.save();
    }

    public get wiredData(): string
    {
        return this._entity.wiredData;
    }

    public set wiredData(data: string)
    {
        if(this._entity.wiredData === data) return;

        this._entity.wiredData = data;

        this.save();
    }
}