import { FurnitureWiredActionComposer } from '../../../../../../app';
import { FurnitureWiredComposer } from '../../../../../../app/messages/outgoing/room/furniture/logic/wired/FurnitureWiredComposer';
import { AffectedPositions, Position } from '../../../../../../common';
import { IRoomUnitController } from '../../../../../room';
import { User } from '../../../../../user';
import { IFurniture } from '../../../../interfaces';
import { FurnitureLogicType } from '../../../FurnitureLogicType';
import { FurnitureWiredActionData } from '../data';
import { FurnitureWiredLogic } from '../FurnitureWiredLogic';

export class FurnitureWiredActionLogic extends FurnitureWiredLogic
{
    private static DELAY_MULTIPLIER: number = 500;

    private _timeouts: NodeJS.Timeout[];

    constructor()
    {
        super();

        this._timeouts = [];
    }
    
    protected cleanUp(): void
    {
        this.removeAllTimeouts();

        super.cleanUp();
    }

    protected addTimeout(cb: Function, delay: number = 0): void
    {
        if(!cb) return;

        delay = delay || this.wiredData.delay;

        delay = (delay < 0 ? 0 : delay) * FurnitureWiredActionLogic.DELAY_MULTIPLIER;

        let timeout = null;

        this._timeouts.push(timeout);

        timeout = setTimeout(() =>
        {
            clearTimeout(timeout);

            const index = this._timeouts.indexOf(timeout);

            if(index >= 0) this._timeouts.splice(index, 1);

            cb();
        }, delay);
    }

    private removeAllTimeouts(): void
    {
        if(!this._timeouts.length) return;

        for(let timeout of this._timeouts)
        {
            if(!timeout) continue;

            clearTimeout(timeout);
        }

        this._timeouts = [];
    }

    protected getClosestUserUnit(furniture: IFurniture, collides: boolean = true): IRoomUnitController
    {
        if(!furniture) return null;

        let closestUnit: IRoomUnitController    = null;
        let unitDistance: number                = 0;

        const units = furniture.room.unit.units;

        if(!units || !units.size) return null;
        
        for(let unit of units.values())
        {
            if(!unit || !unit.location || !unit.location.position || !(unit.holder instanceof User)) continue;

            const distance = unit.location.position.getDistanceAround(furniture.position);

            if(!closestUnit)
            {
                closestUnit     = unit;
                unitDistance    = distance;

                continue;
            }

            if(distance > unitDistance) continue;
            
            closestUnit     = unit;
            unitDistance    = distance;
        }

        if(!closestUnit) return null;

        return closestUnit;
    }

    protected processCollision(furniture: IFurniture, position: Position): boolean
    {
        if(!this.usesCollision || !furniture || !position) return false;

        const positions = AffectedPositions.getPositions(furniture, position);

        if(!positions || !positions.length) return false;

        let collides: boolean = false;

        for(let pos of positions)
        {
            if(!pos) continue;

            const tile = furniture.room.map.getTile(pos);

            if(!tile) continue;

            for(let unit of tile.units.values())
            {
                if(!unit) continue;

                furniture.room && furniture.room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_COLLISION, unit, furniture);

                collides = true;
            }
        }

        if(collides) return true;

        return false;
    }

    protected get usesCollision(): boolean
    {
        return true;
    }

    public createWiredData(): FurnitureWiredActionData
    {
        return new FurnitureWiredActionData();
    }

    public get wiredData(): FurnitureWiredActionData
    {
        return this._wiredData as FurnitureWiredActionData;
    }

    public get configComposer(): typeof FurnitureWiredComposer
    {
        return FurnitureWiredActionComposer;
    }
}