import { Position } from '../../../common';
import { FurnitureLogic, FurnitureStackHelperLogic, IFurniture } from '../../furniture';
import { IRoom } from '../interfaces';
import { IRoomUnitController } from '../unit';
import { RoomTileState } from './RoomTileState';

export class RoomTile
{
    private static TILE_HEIGHT_DEFAULT: number      = 32767;
    private static TILE_HEIGHT_MULTIPLIER: number   = 256;

    private _room: IRoom;

    private _position: Position;
    private _tileHeight: number;
    private _relativeHeight: number;
    private _defaultHeight: number;

    private _hasStackHelper: boolean;
    private _stackHelperHeight: number;

    private _units: Map<number, IRoomUnitController>;
    private _furniture: Map<number, IFurniture>;
    private _highestItem: IFurniture;

    private _state: RoomTileState;
    private _isDoor: boolean;

    constructor(room: IRoom, position: Position, height: number = 0, state: number = RoomTileState.CLOSED)
    {
        if(!room || !position) throw new Error('invalid_tile');

        this._room              = room;

        this._position          = position;
        this._tileHeight        = height || 0;
        this._relativeHeight    = RoomTile.TILE_HEIGHT_DEFAULT;
        this._defaultHeight     = height || 0;

        this._hasStackHelper    = false;
        this._stackHelperHeight = 0;

        this._units             = new Map();
        this._furniture         = new Map();
        this._highestItem       = null;

        this._state             = state;
        this._isDoor            = false;

        this.resetRelativeHeight();
    }

    public addUnit(unit: IRoomUnitController): void
    {
        if(!unit || this._isDoor) return;

        this._units.set(unit.id, unit);
    }

    public removeUnit(unit: IRoomUnitController): void
    {
        if(!unit) return;

        this._units.delete(unit.id);
    }

    public addFurniture(furniture: IFurniture): void
    {
        if(!furniture) return;

        this._furniture.set(furniture.id, furniture);

        if((furniture.height < this._tileHeight) && !(furniture.logic instanceof FurnitureStackHelperLogic)) return;
        
        this.resetHighestItem();
    }

    public removeFurniture(furniture: IFurniture): void
    {
        if(!furniture) return;

        this._furniture.delete(furniture.id);

        if((furniture !== this._highestItem) && !(furniture.logic instanceof FurnitureStackHelperLogic)) return;

        this.resetHighestItem();
    }

    public resetHighestItem(): void
    {
        this._highestItem       = null;
        this._tileHeight        = this._defaultHeight;
        this._hasStackHelper    = false;
        this._stackHelperHeight = 0;

        if(this._furniture && this._furniture.size)
        {
            for(let furniture of this._furniture.values())
            {
                if(!furniture) continue;

                const height = furniture.height;

                if(furniture.logic instanceof FurnitureStackHelperLogic)
                {
                    this._hasStackHelper    = true;
                    this._stackHelperHeight = height;

                    continue;
                }

                if(height < this._tileHeight) continue;

                this._highestItem   = furniture;
                this._tileHeight    = height;
            }
        }

        this.resetRelativeHeight();
    }

    public resetTileHeight(): void
    {
        this._tileHeight = this._highestItem ? this._highestItem.height : this._defaultHeight;

        this.resetRelativeHeight();
    }

    private resetRelativeHeight(): void
    {
        this._relativeHeight = RoomTile.TILE_HEIGHT_DEFAULT;

        if(this._state === RoomTileState.CLOSED || !this.canStack()) return;

        this._relativeHeight = Math.ceil((this._hasStackHelper ? this._stackHelperHeight : this._tileHeight) * RoomTile.TILE_HEIGHT_MULTIPLIER);
    }

    public hasLogic(logicType: typeof FurnitureLogic): boolean
    {
        if(!logicType) return null;

        if(!this._furniture.size) return null;

        for(let furniture of this._furniture.values())
        {
            if(!furniture || !furniture.logic) continue;

            if(!(furniture.logic instanceof logicType)) continue;

            return true;
        }

        return false;
    }

    public isValid(unit: IRoomUnitController): boolean
    {
        return this._room && this._room.map && this._room.map.getValidTile(unit, this._position) === this;
    }

    public touches(tile: RoomTile): boolean
    {
        return tile && this._position.getDistanceAround(tile.position) <= 2;
    }

    public canWalk(): boolean
    {
        if(this._highestItem)
        {
            if(!this._highestItem.logic || !this._highestItem.logic.isFurnitureOpen()) return false;

            if(this._hasStackHelper && (this._stackHelperHeight >= this._highestItem.height)) return false;

            return true;
        }
        
        if(this._hasStackHelper) return false;

        return true;
    }

    public canSit(): boolean
    {
        if(this._highestItem)
        {
            if(this._highestItem.logic && this._highestItem.logic.isFurnitureSittable()) return true;
        }

        return false;
    }

    public canLay(): boolean
    {
        if(this._highestItem)
        {
            if(this._highestItem.logic && this._highestItem.logic.isFurnitureLayable()) return true;
        }

        return false;
    }

    public canStack(): boolean
    {
        if(this._hasStackHelper) return true;
        
        if(this._highestItem)
        {
            if(!this._highestItem.logic || !this._highestItem.logic.isFurnitureStackable()) return false;
        }

        return true;
    }

    public getWalkingHeight(): number
    {
        let height = this._tileHeight;

        if(this._highestItem)
        {
            height = this._highestItem.height;

            if(this._highestItem.logic.isFurnitureSittable() || this._highestItem.logic.isFurnitureLayable()) height -= this._highestItem.logic.furnitureStackHeight();
        }

        return height;
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get position(): Position
    {
        return this._position;
    }

    public get tileHeight(): number
    {
        if(this._hasStackHelper) return this._stackHelperHeight;

        return this._tileHeight;
    }

    public get relativeHeight(): number
    {
        return this._relativeHeight;
    }

    public get defaultHeight(): number
    {
        return this._defaultHeight;
    }

    public get hasStackHelper(): boolean
    {
        return this._hasStackHelper;
    }

    public get state(): RoomTileState
    {
        return this._state;
    }

    public get isDoor(): boolean
    {
        return this._isDoor;
    }

    public set isDoor(value: boolean)
    {
        this._isDoor = value;
    }

    public get units(): Map<number, IRoomUnitController>
    {
        return this._units;
    }

    public get furniture(): Map<number, IFurniture>
    {
        return this._furniture;
    }

    public get highestItem(): IFurniture
    {
        return this._highestItem;
    }

    public set highestItem(furniture: IFurniture)
    {
        this._highestItem = furniture;
    }
}