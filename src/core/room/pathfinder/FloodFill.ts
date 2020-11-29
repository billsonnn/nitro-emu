import { MovePoints, Position } from '../../../common';
import { BattleBanzaiGameTile, IRoomGame, IRoomGamePlayer, IRoomGameTile } from '../games';

export class FloodFill
{
    public static getFill(player: IRoomGamePlayer, tile: IRoomGameTile): IRoomGameTile[]
    {
        const closed: IRoomGameTile[]   = [];
        const open: IRoomGameTile[]     = [];

        open.push(tile);

        while(open.length)
        {
            const currentTile = open.pop();

            if(!currentTile) continue;

            const neighbours = FloodFill.neighbours(player.team.game, currentTile.position);

            if(neighbours)
            {
                const totalNeighbours = neighbours.length;

                if(totalNeighbours)
                {
                    for(let i = 0; i < totalNeighbours; i++)
                    {
                        const neighbour = <BattleBanzaiGameTile> neighbours[i];

                        if(!neighbour) return null;

                        if(neighbour.isDisabled) return null;

                        if((neighbour.color !== player.team.color || !neighbour.isLocked) && closed.indexOf(neighbour) === -1 && open.indexOf(neighbour) === -1) open.unshift(neighbour);
                    }
                }
            }

            closed.push(currentTile);
        }

        return closed;
    }

    public static neighbours(game: IRoomGame, position: Position, radius: number = 1): IRoomGameTile[]
    {
        const tiles: IRoomGameTile[] = [];

        const movePoints = MovePoints.STANDARD_POINTS;

        if(!movePoints || !movePoints.length) return null;

        for(let point of movePoints)
        {
            if(!point) continue;

            let temp: Position = position;

            let iterator = 0;

            while(iterator < radius)
            {
                temp = temp.addPosition(point);

                if(!temp) continue;

                tiles.push(game.getTile(temp));

                iterator++;
            }
        }

        if(!tiles || !tiles.length) return null;

        return tiles;
    }
}