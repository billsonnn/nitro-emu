import { Position } from '../../common';
import { IFurniture } from '../furniture';
import { IRoom } from './interfaces';
import { RoomTile } from './mapping';
import { IRoomUnitController } from './unit';

export class RoomRollerData
{
    private _room: IRoom;
    private _position: Position;
    private _positionNext: Position;

    private _tile: RoomTile;
    private _tileNext: RoomTile;

    private _roller: IFurniture;

    private _units: Map<number, { unit: IRoomUnitController, height: number, nextHeight: number }>;
    private _furniture: Map<number, { furniture: IFurniture, height: number, nextHeight: number }>;

    constructor(room: IRoom, position: Position, positionNext: Position)
    {
        if(!room || !position || !positionNext) throw new Error('invalid_roll');

        this._room          = room;
        this._position      = position;
        this._positionNext  = positionNext;

        this._tile          = null;
        this._tileNext      = null;

        this._roller        = null;

        this._units         = new Map();
        this._furniture     = new Map();
    }

    public setTiles(): boolean
    {
        if(!this._room || !this._room.map) return false;

        const tile      = this._room.map.getTile(this._position);
        const tileNext  = this._room.map.getTile(this._positionNext);

        if(!tile || !tileNext) return false;

        this._tile      = tile;
        this._tileNext  = tileNext;

        return true;
    }

    public setRoller(roller: IFurniture): boolean
    {
        if(!roller || this._roller) return false;

        this._roller = roller;

        return true;
    }
    
    public addUnit(unit: IRoomUnitController, height: number = 0, nextHeight: number = 0): void
    {
        if(!unit) return;

        this._units.set(unit.id, { unit, height, nextHeight });

        unit.setRollerData(this);
    }

    public removeUnit(unit: IRoomUnitController): void
    {
        if(!unit) return;

        const existing = this._units.get(unit.id);

        if(!existing) return;

        this._units.delete(unit.id);

        unit.setRollerData(null);
    }

    public addFurniture(furniture: IFurniture, height: number = 0, nextHeight: number = 0): void
    {
        if(!furniture) return;

        this._furniture.set(furniture.id, { furniture, height, nextHeight });

        furniture.setRollerData(this);
    }

    public removeFurniture(furniture: IFurniture): void
    {
        if(!furniture) return;

        const existing = this._furniture.get(furniture.id);

        if(!existing) return;

        this._furniture.delete(furniture.id);

        furniture.setRollerData(null);
    }

    public commitRoll(): void
    {
        if(!this._tile || !this._tileNext) return;

        if(this._units && this._units.size)
        {
            for(let unit of this._units.values())
            {
                if(!unit) continue;

                if(!unit.unit || !unit.unit.location || !unit.unit.rollerData || (unit.unit.rollerData !== this) || (unit.unit.location.getTile() !== this._tile))
                {
                    this.removeUnit(unit.unit);

                    continue;
                }

                unit.unit.location.position.x = this._tileNext.position.x;
                unit.unit.location.position.y = this._tileNext.position.y;
                unit.unit.location.position.z = unit.nextHeight;

                this._tile.removeUnit(unit.unit);
                this._tileNext.addUnit(unit.unit);
            }
        }

        if(this._furniture && this._furniture.size)
        {
            for(let furniture of this._furniture.values())
            {
                if(!furniture) continue;
                
                if(!furniture.furniture.rollerData || (furniture.furniture.rollerData !== this) || (furniture.furniture.getTile() !== this._tile))
                {
                    this.removeFurniture(furniture.furniture);

                    continue;
                }

                furniture.furniture.position.x = this._tileNext.position.x;
                furniture.furniture.position.y = this._tileNext.position.y;
                furniture.furniture.position.z = furniture.nextHeight;

                furniture.furniture.save();

                this._tile.removeFurniture(furniture.furniture);
                this._tileNext.addFurniture(furniture.furniture);
            }
        }
    }

    public completeRoll(): void
    {
        if(this._units && this._units.size)
        {
            for(let unit of this._units.values())
            {
                if(!unit) continue;

                unit.unit.setRollerData(null);
            }
        }

        if(this._furniture && this._furniture.size)
        {
            for(let furniture of this._furniture.values())
            {
                if(!furniture) continue;

                furniture.furniture.setRollerData(null);
            }
        }
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get position(): Position
    {
        return this._position;
    }

    public get positionNext(): Position
    {
        return this._positionNext;
    }

    public get tile(): RoomTile
    {
        return this._tile;
    }

    public get tileNext(): RoomTile
    {
        return this._tileNext;
    }

    public get roller(): IFurniture
    {
        return this._roller;
    }

    public get units(): Map<number, { unit: IRoomUnitController, height: number, nextHeight: number }>
    {
        return this._units;
    }

    public get furniture(): Map<number, { furniture: IFurniture, height: number, nextHeight: number }>
    {
        return this._furniture;
    }
}