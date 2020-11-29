import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureMultiHeightLogic extends FurnitureLogic
{
    public setState(state: number = null, refresh: boolean = true): boolean
    {
        const tile = this.furniture.getTile();

        if(tile)
        {
            if(tile.highestItem !== this.furniture) return false;
        }
        
        if(!super.setState(state, refresh)) return false;

        const room = this.furniture.room;

        if(!room) return false;

        if(tile) tile.resetTileHeight();

        room.map.updatePositions(true, this.furniture.position);

        return true;
    }

    public furnitureStackHeight(): number
    {
        if(!this.definition) return 0;

        const multiHeight = this.definition.multiHeights.get(this.data.state) || 0;

        if(multiHeight !== undefined) return multiHeight;

        return this.definition.stackHeight || 0;
    }
}