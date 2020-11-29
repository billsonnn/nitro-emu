import { FurnitureFloorAddComposer, FurnitureFloorRemoveComposer, FurnitureFloorUpdateComposer, RoomStackHeightComposer } from '../../../app';
import { AffectedPositions, Position } from '../../../common';
import { Byte } from '../../../networking';
import { IFurniture } from '../../furniture';
import { IRoom } from '../interfaces';
import { IRoomUnitController } from '../unit';
import { RoomTile } from './RoomTile';
import { RoomTileState } from './RoomTileState';

export class RoomMap
{
    private _room: IRoom;

    private _map: RoomTile[][];
    private _tiles: RoomTile[];

    constructor(room: IRoom)
    {
        if(!room) throw new Error('invalid_room');

        this._room  = room;

        this._map   = [];
        this._tiles = [];
    }

    public dispose(): void
    {
        this._map   = [];
        this._tiles = [];
    }

    public generateMap(): void
    {
        if(!this._room.model) return;

        this._map   = [];
        this._tiles = [];

        const totalX    = this._room.model.totalX;
        const totalY    = this._room.model.totalY;

        if(!totalX || !totalY) return;

        for(let y = 0; y < totalY; y++)
        {
            for(let x = 0; x < totalX; x++)
            {
                const height    = this._room.model.getTileHeight(x, y);
                const state     = this._room.model.getTileState(x, y);

                const tile = new RoomTile(this._room, new Position(x, y), height, state);

                if(this._map[x] === undefined) this._map[x] = [];

                this._map[x][y] = tile;

                this._tiles.push(this._map[x][y]);
            }
        }

        const doorTile = this.getTile(this._room.model.doorPosition);

        if(doorTile) doorTile.isDoor = true;
    }

    public getTile(position: Position): RoomTile
    {
        if(!position || this._map[position.x] === undefined || this._map[position.x][position.y] === undefined) return null;
        
        const tile = this._map[position.x][position.y];

        if(!tile || !tile.state || tile.state === RoomTileState.CLOSED) return null;
        
        return tile;
    }

    public getValidTile(unit: IRoomUnitController, position: Position, isGoal: boolean = true): RoomTile
    {
        if(!unit || !position) return null;
        
        const tile = this.getTile(position);

        if(!tile) return null;
        
        if(tile.isDoor) return tile;

        if(tile.units.size)
        {
            for(let existingUnit of tile.units.values())
            {
                if(!existingUnit) continue;

                if(existingUnit === unit) return tile;
            }

            if(this._room.details.allowWalkThrough)
            {
                if(isGoal) return null;
            }
            else return null;
        }

        if(!tile.canWalk()) return null;

        return tile;
    }

    public getValidDiagonalTile(unit: IRoomUnitController, position: Position): RoomTile
    {
        if(!unit || !position) return null;
        
        const tile = this.getTile(position);

        if(!tile) return null;
        
        if(tile.isDoor) return tile;

        if(tile.units.size)
        {
            for(let existingUnit of tile.units.values())
            {
                if(!existingUnit) continue;

                if(existingUnit === unit) return tile;
            }

            if(!this._room.details.allowWalkThrough) return null;
        }

        if(!tile.canWalk() || tile.canSit() || tile.canLay()) return null;

        return tile;
    }

    public getValidTileAroundPosition(unit: IRoomUnitController, position: Position): RoomTile
    {
        if(!unit || !position) return null;

        const positions = position.getPositionsAround();

        if(!positions || !positions.length) return null;

        for(let pos of positions)
        {
            if(!pos) continue;

            const tile = this.getValidTile(unit, pos);

            if(!tile || tile.isDoor) continue;

            return tile;
        }

        return null;
    }

    public getHighestTileForFurniture(furniture: IFurniture, ...tiles: RoomTile[]): RoomTile
    {
        if(!furniture) return null;
        
        tiles = [ ...tiles ];

        if(!tiles || !tiles.length) tiles = furniture.getTiles();

        let highestTile: RoomTile = null;

        for(let tile of tiles)
        {
            if(!tile) continue;

            if(!highestTile)
            {
                highestTile = tile;

                continue;
            }

            let height = tile.tileHeight;

            if(tile.highestItem === furniture) height -= tile.highestItem.height;

            if(height < highestTile.tileHeight) continue;

            highestTile = tile;
        }

        return highestTile;
    }

    public addFurniture(...furniture: IFurniture[]): void
    {
        furniture = [ ...furniture ];

        if(!furniture || !furniture.length) return;

        const positions: Position[] = [];

        for(let item of furniture)
        {
            if(!item) continue;

            const affectedPositions = AffectedPositions.getPositions(item);

            if(!affectedPositions || !affectedPositions.length) continue;

            for(let position of affectedPositions)
            {
                if(!position) continue;

                const tile = this.getTile(position);

                if(!tile) continue;

                tile.addFurniture(item);

                positions.push(position);
            }

            if(this._room.isLoaded) this._room.unit.processComposer(new FurnitureFloorAddComposer(item));
        }

        if(this._room.isLoaded) this.updatePositions(true, ...positions);
    }

    public moveFurniture(furniture: IFurniture, oldPosition: Position, sendUpdate: boolean = true): void
    {
        if(!furniture) return;

        const positions: Position[] = [];

        if(oldPosition)
        {
            const oldAffectedPositions = AffectedPositions.getPositions(furniture, oldPosition);

            if(oldAffectedPositions && oldAffectedPositions.length)
            {
                for(let position of oldAffectedPositions)
                {
                    if(!position) continue;

                    const tile = this.getTile(position);

                    if(!tile) continue;

                    tile.removeFurniture(furniture);

                    positions.push(position);
                }
            }
        }

        const newAffectedPositions = AffectedPositions.getPositions(furniture);

        if(newAffectedPositions && newAffectedPositions.length)
        {
            for(let position of newAffectedPositions)
            {
                if(!position) continue;

                const tile = this.getTile(position);

                if(!tile) continue;

                tile.addFurniture(furniture);

                positions.push(position);
            }
        }

        if(this._room.isLoaded)
        {
            this.updatePositions(true, ...positions);

            if(sendUpdate) this._room.unit.processComposer(new FurnitureFloorUpdateComposer(furniture));
        }
    }

    public removeFurniture(...furniture: IFurniture[]): void
    {
        furniture = [ ...furniture ];

        if(!furniture || !furniture.length) return;

        const positions: Position[] = [];

        for(let item of furniture)
        {
            if(!item) continue;

            const affectedPositions = AffectedPositions.getPositions(item);

            if(!affectedPositions || !affectedPositions.length) continue;

            for(let position of affectedPositions)
            {
                if(!position) continue;

                const tile = this.getTile(position);

                if(!tile) continue;

                tile.removeFurniture(item);

                positions.push(position);
            }

            if(this._room.isLoaded) this._room.unit.processComposer(new FurnitureFloorRemoveComposer(item));
        }

        if(this._room.isLoaded) this.updatePositions(true, ...positions);
    }

    public updatePositions(updateUnits: boolean, ...positions: Position[]): void
    {
        positions = [ ...positions ];

        if(!positions || !positions.length) return;

        let tiles: RoomTile[] = [];

        if(updateUnits) this._room.unit.updateUnitsAt(...positions);

        for(let position of positions)
        {
            if(!position) continue;

            const tile = this.getTile(position);

            if(!tile || (tiles.indexOf(tile) >= 0)) continue;

            tiles.push(tile);

            if(tiles.length === Byte.BYTE_MAX_VALUE)
            {
                this._room.unit.processComposer(new RoomStackHeightComposer(tiles));

                tiles = [];
            }
        }

        if(!tiles.length) return;

        this._room.unit.processComposer(new RoomStackHeightComposer(tiles));
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get tiles(): RoomTile[]
    {
        return this._tiles;
    }
}