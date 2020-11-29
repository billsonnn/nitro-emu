import { RoomUnitStatusComposer } from '../../../app';
import { Position } from '../../../common';
import { IRoom } from '../interfaces';
import { PathFinder } from '../pathfinder';
import { IRoomUnitController, RoomUnitStatusEnum } from '../unit';
import { RoomTask } from './RoomTask';

export class RoomUnitStatusTask extends RoomTask
{
    private _room: IRoom;

    constructor(room: IRoom)
    {
        super('RoomUnitStatusTask');

        if(!room) throw new Error('invalid_room');

        this._room = room;
    }

    protected onRun(): void
    {   
        const updatedUnits: IRoomUnitController[] = [];

        const units = this._room.unit && this._room.unit.units;

        if(!units) return;

        for(let unit of units.values())
        {
            if(!unit) continue;

            try
            {
                const room = unit.manager && unit.manager.room;

                if(room !== this._room)
                {
                    unit.dispose();

                    continue;
                }

                this.processUnit(unit);

                if(!unit.needsUpdate) continue;

                unit.needsUpdate = false;

                updatedUnits.push(unit);
            }

            catch(err)
            {
                this._room.logger.error(err.message || err, err.stack);
            }
        }

        if(!updatedUnits || !updatedUnits.length) return;

        this._room.unit.processComposer(new RoomUnitStatusComposer(updatedUnits));
    }

    private processUnit(unit: IRoomUnitController): void
    {
        if(!unit) return;

        if(unit.rollerData || !unit.location.isWalking) return;

        if(!unit.location.currentPath.length) return unit.location.stopWalking();

        unit.location.processNextPosition();
        
        this.checkStep(unit, (unit.location && unit.location.position) || null, unit.location.currentPath.shift());
    }

    private checkStep(unit: IRoomUnitController, position: Position, positionNext: Position): void
    {
        if(!unit) return;

        if(!position || !positionNext) return unit.location.stopWalking();

        const isGoal        = unit.location.currentPath.length === 0;
        const currentTile   = this._room.map.getTile(position);
        const nextTile      = this._room.map.getValidTile(unit, positionNext, isGoal);

        if(currentTile === nextTile) return unit.location.stopWalking();

        if(!currentTile) return unit.location.stopWalking();

        if(!nextTile)
        {
            unit.location.clearPath();
            unit.location.walkTo(unit.location.positionGoal);

            return this.processUnit(unit);
        }
        
        const currentHeight = currentTile.getWalkingHeight();
        const nextHeight    = nextTile.getWalkingHeight();
        
        if(Math.abs(nextHeight - currentHeight) > Math.abs(PathFinder.MAX_WALKING_HEIGHT)) return unit.location.stopWalking();

        if(PathFinder.ALLOW_DIAGONALS && !position.compare(positionNext))
        {
            const firstCheck    = this._room.map.getValidDiagonalTile(unit, new Position(positionNext.x, position.y));
            const secondCheck   = this._room.map.getValidDiagonalTile(unit, new Position(position.x, positionNext.y));

            if(!firstCheck && !secondCheck) return unit.location.stopWalking();
        }

        currentTile.removeUnit(unit);
        nextTile.addUnit(unit);

        const currentFurniture  = currentTile.highestItem;
        const nextFurniture     = nextTile.highestItem;

        if(nextFurniture)
        {
            if(isGoal)
            {
                if(!nextFurniture.logic.isFurnitureOpen()) return unit.location.stopWalking();
            }
            else
            {
                if(!nextFurniture.logic.isFurnitureOpen() || (nextFurniture.logic.isFurnitureSittable() || nextFurniture.logic.isFurnitureLayable())) return unit.location.stopWalking();
            }
        }

        if(currentFurniture)
        {
            if(currentFurniture !== nextFurniture) currentFurniture.logic.onLeave(unit);
        }
        
        unit.location.removeStatus(RoomUnitStatusEnum.LAY, RoomUnitStatusEnum.SIT);
        unit.location.addStatus(RoomUnitStatusEnum.MOVE, `${ nextTile.position.x },${ nextTile.position.y },${ nextHeight }`);
        unit.location.position.setRotation(position.calculateWalkDirection(positionNext));
        unit.location.positionNext = positionNext;

        if(nextFurniture)
        {
            nextFurniture.logic.beforeStep(unit);

            if(nextFurniture !== currentFurniture) nextFurniture.logic.onEnter(unit);
        }
        
        unit.needsUpdate = true;
    }
}