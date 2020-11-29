import { NitroManager } from '../../../common';
import { FurnitureLogicFactory, FurnitureWiredActionLogic, FurnitureWiredConditionLogic, FurnitureWiredLogic, FurnitureWiredTriggerLogic, IFurniture } from '../../furniture';
import { IUser } from '../../user';
import { IRoom } from '../interfaces';
import { RoomTile } from '../mapping';

export class RoomWiredManager extends NitroManager
{
    private _room: IRoom;

    private _isPaused: boolean;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room      = room;

        this._isPaused  = false;
    }

    public toggleWired(user: IUser): void
    {
        if(!user || !this._room.security.isOwner(user)) return;

        this._isPaused = !this._isPaused;
    }

    public getFurnitureByTrigger(trigger: typeof FurnitureWiredTriggerLogic): IFurniture[]
    {
        return (this._room.furniture && this._room.furniture.getFurnitureByLogic(trigger)) || null;
    }

    public getConditionFurnitureByTile(tile: RoomTile): IFurniture[]
    {
        if(!tile) return null;

        const furniture: IFurniture[] = [];

        if(tile.furniture && tile.furniture.size)
        {
            for(let item of tile.furniture.values())
            {
                if(!item) continue;

                if(!(item.logic instanceof FurnitureWiredConditionLogic)) continue;

                furniture.push(item);
            }
        }

        if(!furniture || !furniture.length) return null;

        return furniture;
    }

    public getActionFurnitureByTile(tile: RoomTile): IFurniture[]
    {
        if(!tile) return null;

        const furniture: IFurniture[] = [];

        if(tile.furniture && tile.furniture.size)
        {
            for(let item of tile.furniture.values())
            {
                if(!item) continue;

                if(!(item.logic instanceof FurnitureWiredActionLogic)) continue;

                furniture.push(item);
            }
        }

        if(!furniture || !furniture.length) return null;

        return furniture;
    }

    public processConditionsAtTile(tile: RoomTile, ...args: any[]): boolean
    {
        if(this._isPaused) return false;

        const conditions = this.getConditionFurnitureByTile(tile);

        if(conditions && conditions.length)
        {
            for(let condition of conditions)
            {
                if(!condition) continue;

                if(!this.canTrigger(condition, ...args)) return false;
            }
        }

        return true;
    }

    public processActionsAtTile(tile: RoomTile, ...args: any[]): boolean
    {
        if(this._isPaused) return false;

        const actions = this.getActionFurnitureByTile(tile);

        if(actions && actions.length)
        {
            for(let action of actions)
            {
                if(!action) continue;

                if(!this.canTrigger(action, ...args)) continue;
            }
        }

        return true;
    }

    public processTriggers(trigger: string, ...args: any[]): boolean
    {
        if(this._isPaused) return false;

        if(!trigger) return false;

        const logic = FurnitureLogicFactory.getLogicByType(trigger) as typeof FurnitureWiredTriggerLogic;

        if(!logic) return false;

        const triggers = this.getFurnitureByTrigger(logic);

        if(!triggers || !triggers.length) return false;

        let didTrigger = false;

        for(let item of triggers)
        {
            if(!item) continue;

            if(!this.processTrigger(item, ...args)) continue;
            
            didTrigger = true;
        }

        return didTrigger;
    }

    public processTrigger(trigger: IFurniture, ...args: any[]): boolean
    {
        if(this._isPaused) return false;

        if(!trigger || !(trigger.logic instanceof FurnitureWiredLogic)) return false;

        const tile = trigger.getTile();

        if(!tile) return false;

        if(!this.processConditionsAtTile(tile, ...args)) return false;

        if(!this.canTrigger(trigger, ...args)) return false;

        this.processActionsAtTile(tile, ...args);

        return true;
    }

    public canTrigger(trigger: IFurniture, ...args: any[]): boolean
    {
        if(!trigger) return false;

        const logic = trigger.logic as FurnitureWiredLogic;

        if(!logic.canTrigger(...args)) return false;

        logic.onTriggered(...args);

        return true;
    }

    public get room(): IRoom
    {
        return this._room;
    }
}