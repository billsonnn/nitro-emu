import { MovePoints, Position } from '../../../common';
import { IRoom } from '../interfaces';
import { IRoomUnitController } from '../unit';
import { PathFinderNode } from './node';

export class PathFinder
{
    public static ALLOW_DIAGONALS: boolean     = true;
    public static MAX_WALKING_HEIGHT: number   = 2;

    public static isValidStep(unit: IRoomUnitController, room: IRoom, position: Position, positionNext: Position, positionGoal: Position): boolean
    {
        if(!unit || !room || !position || !positionNext || !positionGoal) return false;

        const isGoal        = positionNext.compare(positionGoal);
        const currentTile   = room.map.getValidTile(unit, position, false);
        const nextTile      = room.map.getValidTile(unit, positionNext, isGoal);

        if((!currentTile || !nextTile) || (nextTile.isDoor && !isGoal)) return false;

        const currentHeight = currentTile.getWalkingHeight();
        const nextHeight    = nextTile.getWalkingHeight();
        
        if(Math.abs(nextHeight - currentHeight) > Math.abs(PathFinder.MAX_WALKING_HEIGHT)) return false;

        if(PathFinder.ALLOW_DIAGONALS && !position.compare(positionNext))
        {
            const firstCheck    = room.map.getValidDiagonalTile(unit, new Position(positionNext.x, position.y));
            const secondCheck   = room.map.getValidDiagonalTile(unit, new Position(position.x, positionNext.y));

            if(!firstCheck && !secondCheck) return false;
        }

        if(nextTile.position.compare(unit.location.position)) return true;
        
        if(!isGoal && (nextTile.canSit() || nextTile.canLay())) return false;

        return true;
    }

    public static makePath(unit: IRoomUnitController, position: Position): Position[]
    {
        const positions: Position[] = [];

        let node = this.calculatePathFinderNode(unit, position);

        if(!node || !node.nextNode) return null;

        while(node.nextNode)
        {
            positions.push(node.position);

            node = node.nextNode;
        }

        if(!positions.length) return null;
        
        return positions.reverse();
    }

    private static calculatePathFinderNode(unit: IRoomUnitController, position: Position): PathFinderNode
    {
        if(!unit || !position) return null;

        position = position.copy();

        const currentRoom = unit.manager && unit.manager.room;

        if(!currentRoom) return null;

        if(!currentRoom.map.getValidTile(unit, position)) return null;
        
        const nodes: PathFinderNode[]       = [];
        const nodeMap: PathFinderNode[][]   = [];
        const nodeGoal: PathFinderNode      = new PathFinderNode(position);

        let currentNode: PathFinderNode = null;
        let tempNode: PathFinderNode    = null;
        let tempPosition: Position      = null;

        let cost        = 0;
        let difference  = 0;

        currentNode         = new PathFinderNode(unit.location.position);
        currentNode.cost    = 0;

        if(!currentNode || !nodeGoal) return null;
        
        if(nodeMap[currentNode.position.x] === undefined) nodeMap[currentNode.position.x] = [];
                    
        nodeMap[currentNode.position.x][currentNode.position.y] = currentNode;
        nodes.push(currentNode);

        let walkingPoints: Position[] = PathFinder.ALLOW_DIAGONALS ? MovePoints.MOVE_POINTS : MovePoints.STANDARD_POINTS;

        const totalWalkingPoints = walkingPoints.length;

        if(!totalWalkingPoints) return null;

        while(nodes.length)
        {
            currentNode             = nodes.shift();
            currentNode.isClosed    = true;

            for(let i = 0; i < totalWalkingPoints; i++)
            {
                const walkingPoint = walkingPoints[i];

                tempPosition = currentNode.position.addPosition(walkingPoint);

                if(!this.isValidStep(unit, currentRoom, currentNode.position, tempPosition, nodeGoal.position)) continue;
                
                if(nodeMap[tempPosition.x] === undefined) nodeMap[tempPosition.x] = [];
                
                if(nodeMap[tempPosition.x][tempPosition.y] === undefined)
                {
                    tempNode = new PathFinderNode(tempPosition);
                    nodeMap[tempPosition.x][tempPosition.y] = tempNode;
                }
                else tempNode = nodeMap[tempPosition.x][tempPosition.y];

                if(tempNode.isClosed) continue;

                difference = 0;

                if(currentNode.position.x !== tempNode.position.x) difference += 2;
                if(currentNode.position.y !== tempNode.position.y) difference += 2;
                    
                cost = currentNode.cost + difference + tempNode.position.getDistanceAround(nodeGoal.position);

                if(tempNode.isOpen) continue;

                if(cost < tempNode.cost)
                {
                    tempNode.cost       = cost;
                    tempNode.nextNode   = currentNode;
                }

                if(tempNode.position.compare(nodeGoal.position))
                {
                    tempNode.nextNode = currentNode;

                    return tempNode;
                }

                tempNode.isOpen = true;
                nodes.push(tempNode);
            }
        }

        return null;
    }
}