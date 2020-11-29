import { FurnitureStackHelperComposer } from '../../../../app';
import { Position } from '../../../../common';
import { IUser } from '../../../user';
import { Furniture } from '../../Furniture';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureStackHelperLogic extends FurnitureLogic
{
    public onPlace(user: IUser): void
    {
        this.resetHeight();
    }

    public onMove(user: IUser): void
    {
        this.resetHeight();
    }

    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public setStackHelperHeight(user: IUser, height: number = 0): void
    {
        if(!user) return;

        const tiles = this.furniture.getTiles();

        if(!tiles || !tiles.length) return;

        const defaultHeight = tiles[0].defaultHeight || 0;

        if(height === -1)
        {
            height = defaultHeight;

            for(let tile of tiles)
            {
                if(!tile) continue;

                const furniture = tile.highestItem;

                if(!furniture || !furniture.logic || !furniture.logic.isFurnitureStackable()) continue;

                const furnitureHeight = furniture.height;
                    
                if(furnitureHeight < height) continue;

                height = furnitureHeight;
            }
        }

        height = (height < defaultHeight) ? defaultHeight : height;

        if(height > Furniture.MAX_FURNITURE_Z) height = Furniture.MAX_FURNITURE_Z;

        this.furniture.position.z = height;

        const positions: Position[] = [];

        for(let tile of tiles)
        {
            if(!tile) continue;

            tile.resetHighestItem();

            positions.push(tile.position);
        }

        height = Math.ceil(height * 100);

        this.setState(height, false);

        if(this.furniture.room)
        {
            this.furniture.room.map.updatePositions(true, ...positions);

            this.furniture.room.unit.processComposer(new FurnitureStackHelperComposer(this.furniture.id, height));

            this.refreshFurniture();
        }
    }

    private resetHeight(): void
    {
        const tile = this.furniture.getTile();

        if(!tile) return;

        this.furniture.position.z = tile.defaultHeight;

        this.furniture.save();
    }

    public isFurnitureOpen(): boolean
    {
        return false;
    }

    public isFurnitureRollable(): boolean
    {
        return false;
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }

    public isFurnitureStackable(): boolean
    {
        return true;
    }
}