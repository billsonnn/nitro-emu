import { IFurniture } from '../../../../furniture';
import { FloodFill } from '../../../pathfinder';
import { IRoomGame } from '../../interfaces';
import { RoomGameTile } from '../../RoomGameTile';
import { IRoomGamePlayer } from '../../teams';

export class BattleBanzaiGameTile extends RoomGameTile
{
    private _color: number;
    private _isLocked: boolean;

    constructor(game: IRoomGame, furniture: IFurniture)
    {
        super(game, furniture);

        this.resetTile();
    }

    public resetTileAndOpen(): void
    {
        this.resetTile();

        if(!this.furniture || !this.furniture.logic) return;

        this.furniture.logic.setState(1);
    }

    public resetTileAndClose(): void
    {
        this.resetTile();

        if(!this.furniture || !this.furniture.logic) return;

        if(this.furniture.logic.data.state <= 2) this.furniture.logic.setState(0);
    }

    public resetTile(): void
    {
        this._color     = null;
        this._isLocked  = false;
    }

    public markTile(player: IRoomGamePlayer): void
    {
        if(!player || this._isLocked || !this.furniture || !this.furniture.logic) return;

        let state = this.furniture.logic.data.state;

        this.setColor(player);

        const check = state - (this._color * 3);

        if(check === 3 || check === 4)
        {
            state++;

            if(state % 3 === 2) return this.lockTile(player);
        }
        else
        {
            state = (player.team.color * 3) + 3;
        }
        
        this.furniture.logic.setState(state);
    }

    private lockTile(player: IRoomGamePlayer, checkFill: boolean = true): void
    {
        if(!player || this._isLocked || !this.furniture || !this.furniture.logic) return;

        this.setColor(player);

        this._isLocked = true;

        this.furniture.logic.setState(2 + (this._color * 3) + 3);

        player.team.lockedTiles.set(this.furniture.id, this);

        if(checkFill) this.checkFill(player);

        player.adjustScore(1);
    }

    private checkFill(player: IRoomGamePlayer): void
    {
        if(!player) return;

        const neighbours = FloodFill.neighbours(player.team.game, this.position);

        if(!neighbours || !neighbours.length) return;

        for(let neighbour of neighbours)
        {
            let tile = neighbour as BattleBanzaiGameTile;

            if(!tile || tile.isLocked || tile.isDisabled) continue;

            const filledTiles = FloodFill.getFill(player, neighbour);

            if(!filledTiles || !filledTiles.length) continue;

            for(let filled of filledTiles)
            {
                let filledTile = filled as BattleBanzaiGameTile;

                if(!filledTile || filledTile.isLocked) continue;

                filledTile.lockTile(player, false);
            }
        }
    }

    private setColor(player: IRoomGamePlayer): void
    {
        this._color = player.team.color;
    }

    public get color(): number
    {
        return this._color;
    }

    public get isLocked(): boolean
    {
        return this._isLocked;
    }

    public get isClear(): boolean
    {
        return this.furniture.logic && this.furniture.logic.data.state === 1;
    }

    public get isDisabled(): boolean
    {
        return this.furniture.logic && this.furniture.logic.data.state === 0;
    }
}