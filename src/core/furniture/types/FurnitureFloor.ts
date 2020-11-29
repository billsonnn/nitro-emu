import { AffectedPositions, Position } from '../../../common';
import { FurnitureFloorEntity } from '../../../database';
import { IRoom, RoomRollerData, RoomTile } from '../../room';
import { FurnitureFloorDefinition } from '../definition';
import { Furniture } from '../Furniture';
import { IFurniture, IFurnitureManager } from '../interfaces';
import { FurnitureLogicFactory, FurnitureLogicType, FurnitureRollerLogic, FurnitureWiredLogic } from '../logic';

export class FurnitureFloor extends Furniture
{
    public static MAX_FURNITURE_Z: number = 40;

    private _position: Position;
    private _rollerData: RoomRollerData;

    constructor(manager: IFurnitureManager, entity: FurnitureFloorEntity)
    {
        super(manager, entity);

        this._position      = new Position(this.entity.x, this.entity.y, this.entity.z, this.entity.direction);
        this._rollerData    = null;

        if(!this.setLogic()) throw new Error('invalid_logic');
    }

    protected onDispose(): void
    {
        this._rollerData = null;

        super.onDispose();
    }
    
    protected setLogic(): boolean
    {
        if(this.logic) return true;

        const definition = this.manager.getFloorDefinition(this.entity.definitionId);

        if(!definition) return false;

        let logic = FurnitureLogicFactory.createLogicInstance(definition.logicType);

        if(!logic)
        {
            logic = FurnitureLogicFactory.createLogicInstance(FurnitureLogicType.FURNITURE_DEFAULT);

            if(!logic) return false;
        }

        logic.setFurniture(this);

        if(!logic.initialize(definition)) return false;

        this._logic = logic;

        return true;
    }

    public save(queue: boolean = true): void
    {
        this.entity.x          = this._position.x || 0;
        this.entity.y          = this._position.y || 0;
        this.entity.z          = this._position.z || 0;
        this.entity.direction  = this._position.rotation || 0;

        if(this._logic instanceof FurnitureWiredLogic)
        {
            this.entity.wiredData = JSON.stringify((this._logic && this._logic.wiredData && this._logic.wiredData.getAsObject()) || null);
        }

        super.save(queue);
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

    public canPlaceOnTop(furniture: IFurniture): boolean
    {
        if(!furniture || !furniture.logic) return false;

        if(!furniture.logic.isFurnitureStackable()) return false;

        if(furniture.logic.isFurnitureSittable() || furniture.logic.isFurnitureLayable()) return false;

        if(furniture.logic instanceof FurnitureRollerLogic)
        {
            const definition = this._logic.definition as FurnitureFloorDefinition;

            if(definition)
            {
                if((definition.width > 1) || (definition.length > 1)) return false;
            }
        }

        return true;
    }

    public isValidPlacement(position: Position, room: IRoom = null): boolean
    {
        if(!position) return false;

        room = room !== null ? room : this.room;

        const isRotating        = this._position && this._position.rotation !== position.rotation;
        const affectedPositions = AffectedPositions.getPositions(this, position);

        if(!affectedPositions || !affectedPositions.length) return false;

        for(let position of affectedPositions)
        {
            if(!position) continue;

            const tile = room.map.getTile(position);

            if(!tile) return false;

            if(tile.units.size && !this._logic.isFurnitureWalkable()) return false;

            if((tile.tileHeight + this._logic.furnitureStackHeight()) > FurnitureFloor.MAX_FURNITURE_Z) return false;

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
        return (this.room && this.room.map && this.room.map.getTile(this._position)) || null;
    }

    public getTiles(): RoomTile[]
    {
        if(!this.room || !this.room.map) return null;

        const affectedPositions = this.getPositions();

        if(!affectedPositions || !affectedPositions.length) return null;

        const tiles: RoomTile[] = [];

        for(let position of affectedPositions)
        {
            if(!position) continue;

            const tile = this.room.map.getTile(position);

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

    public get entity(): FurnitureFloorEntity
    {
        return super.entity as FurnitureFloorEntity;
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

    public get wiredData(): string
    {
        return this.entity.wiredData;
    }

    public set wiredData(data: string)
    {
        if(this.entity.wiredData === data) return;

        this.entity.wiredData = data;

        this.save();
    }
}