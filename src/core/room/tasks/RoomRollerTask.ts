import { RoomRollingComposer } from '../../../app';
import { Position } from '../../../common';
import { IMessageComposer } from '../../../networking';
import { FurnitureDefinitionType, FurnitureRollerLogic, IFurniture } from '../../furniture';
import { IRoom } from '../interfaces';
import { RoomRollerData } from '../RoomRollerData';
import { IRoomUnitController } from '../unit';
import { RoomTask } from './RoomTask';

export class RoomRollerTask extends RoomTask
{
    private static ROLLER_COMPLETE_TICK: number = 500;

    private _room: IRoom;

    constructor(room: IRoom)
    {
        super('RoomRollerTask');

        if(!room) throw new Error('invalid_room');

        this._room = room;
    }

    protected onRun(): void
    {   
        const rollers = this._room.furniture && this._room.furniture.getFurnitureByLogic(FurnitureRollerLogic);

        if(!rollers || !rollers.length) return;

        const rollingData: RoomRollerData[] = [];
        const positions: Position[]         = [];
        const composers: IMessageComposer[] = [];

        for(let roller of rollers)
        {
            if(!roller || !roller.logic) continue;

            const rollerData = new RoomRollerData(roller.room, roller.position, roller.position.getPositionInfront());

            if(!rollerData.setRoller(roller) || !this.processRollerData(rollerData)) continue;

            rollingData.push(rollerData);
        }

        if(!rollingData || !rollingData.length) return;

        for(let rollerData of rollingData)
        {
            if(!rollerData) continue;

            positions.push(rollerData.position, rollerData.positionNext);

            if(rollerData.units && rollerData.units.size)
            {
                let sent = false;

                for(let unit of rollerData.units.values())
                {
                    if(!unit) continue;

                    if(!sent)
                    {
                        composers.push(new RoomRollingComposer(rollerData, false, unit));

                        sent = true;

                        continue;
                    }

                    composers.push(new RoomRollingComposer(rollerData, true, unit));
                }
            }

            else if(rollerData.furniture && rollerData.furniture.size) composers.push(new RoomRollingComposer(rollerData, false, null));

            rollerData.commitRoll();
        }

        if(composers && composers.length) this._room.unit.processComposer(...composers);

        setTimeout(() =>
        {
            this._room.map.updatePositions(true, ...positions);

            if(!rollingData || !rollingData.length) return;
            
            for(let rollerData of rollingData)
            {
                if(!rollerData) continue;

                rollerData.completeRoll();
            }
        }, RoomRollerTask.ROLLER_COMPLETE_TICK);
    }

    private processRollerData(rollerData: RoomRollerData): boolean
    {
        if(!rollerData || !rollerData.setTiles()) return false;

        if(rollerData.tile.furniture && rollerData.tile.furniture.size)
        {
            for(let furniture of rollerData.tile.furniture.values())
            {
                if(!furniture || !furniture.logic || rollerData.furniture.get(furniture.id)) continue;
                
                if(rollerData.roller && (furniture === rollerData.roller)) continue;

                this.processRollingFurniture(rollerData, furniture);
            }
        }

        if(rollerData.tile.units && rollerData.tile.units.size)
        {
            for(let unit of rollerData.tile.units.values())
            {
                if(!unit || rollerData.units.get(unit.id)) continue;

                this.processRollingUnit(rollerData, unit);
            }
        }

        if(!rollerData.units.size && !rollerData.furniture.size) return false;

        return true;
    }

    public processRollingFurniture(rollerData: RoomRollerData, furniture: IFurniture, validateOnly: boolean = false): boolean
    {
        if(!rollerData || !furniture || !furniture.position) return false;

        if(!furniture.position.compare(rollerData.position)) return false;

        if(!furniture.logic.isFurnitureRollable()) return false;
        
        if(rollerData.roller)
        {
            if(furniture.position.z < rollerData.roller.height) return false;
        }

        if(!furniture.isValidPlacement(rollerData.positionNext)) return false;

        const roomUnits = rollerData.room.unit.units;

        if(roomUnits && roomUnits.size)
        {
            for(let activeUnit of roomUnits.values())
            {
                if(!activeUnit) continue;

                if(activeUnit.location.positionNext)
                {
                    if(activeUnit.location.positionNext.compare(rollerData.positionNext)) return false;
                }

                if(activeUnit.location.isWalking) continue;

                if(activeUnit.rollerData)
                {
                    if(activeUnit.rollerData === rollerData) continue;

                    if(activeUnit.rollerData.positionNext.compare(rollerData.positionNext)) return false;
                }

                if(activeUnit.location.position.compare(rollerData.positionNext)) return false;
            }
        }

        const roomFurniture = rollerData.room.furniture.getFurnitureByType(FurnitureDefinitionType.FLOOR);

        if(roomFurniture && roomFurniture.length)
        {
            for(let item of roomFurniture)
            {
                if(!item || (item === furniture) || (item.logic instanceof FurnitureRollerLogic)) continue;
                
                if(item.rollerData)
                {
                    if(item.rollerData === rollerData) continue;

                    if(item.rollerData.positionNext.compare(rollerData.positionNext)) return false;
                }

                if(item.position.compare(rollerData.positionNext)) return false;
            }
        }

        if(validateOnly) return true;

        let nextHeight = furniture.position.z + 0;

        if(rollerData.roller)
        {
            if(!rollerData.tileNext.hasLogic(FurnitureRollerLogic)) nextHeight -= rollerData.roller.logic.furnitureStackHeight();
        }
        else
        {
            nextHeight = rollerData.tile.tileHeight;
        }

        rollerData.addFurniture(furniture, furniture.position.z, nextHeight);

        return true;
    }

    public processRollingUnit(rollerData: RoomRollerData, unit: IRoomUnitController, validateOnly: boolean = false): boolean
    {
        if(!rollerData || !unit || !unit.location || !unit.location.position || unit.location.isWalking) return false;

        if(!unit.location.position.compare(rollerData.position)) return false;

        if(rollerData.roller)
        {
            if(unit.location.position.z < rollerData.roller.height) return false;
        }

        if(!rollerData.tileNext.isValid(unit)) return false;

        const roomUnits = rollerData.room.unit.units;

        if(roomUnits && roomUnits.size)
        {
            for(let activeUnit of roomUnits.values())
            {
                if(!activeUnit || activeUnit === unit) continue;

                if(activeUnit.location.positionNext)
                {
                    if(activeUnit.location.positionNext.compare(rollerData.positionNext)) return false;
                }

                if(activeUnit.location.isWalking) continue;

                if(activeUnit.rollerData)
                {
                    if(activeUnit.rollerData === rollerData) continue;

                    if(activeUnit.rollerData.positionNext.compare(rollerData.positionNext)) return false;
                }

                if(activeUnit.location.position.compare(rollerData.positionNext)) return false;
            }
        }

        const furniture = unit.location.getFurniture();

        if(furniture && furniture.logic)
        {
            if(!(furniture.logic instanceof FurnitureRollerLogic))
            {
               if(!this.processRollingFurniture(rollerData, furniture, true)) return false;
            }
        }

        if(validateOnly) return true;

        let nextHeight = unit.location.position.z + 0;

        if(rollerData.roller)
        {
            if(!rollerData.tileNext.hasLogic(FurnitureRollerLogic)) nextHeight -= rollerData.roller.logic.furnitureStackHeight();
        }
        else
        {
            nextHeight = rollerData.tile.tileHeight;
        }

        rollerData.addUnit(unit, unit.location.position.z, nextHeight);

        return true;
    }
}