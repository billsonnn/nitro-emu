import { IRoomUnitController } from '../../../room';
import { IUser, User } from '../../../user';
import { IFurnitureDefinition } from '../../definition';
import { FurnitureLogicBase } from '../FurnitureLogicBase';
import { FurnitureLogicType } from '../FurnitureLogicType';
import { IFurnitureLogic } from '../interfaces';

export class FurnitureLogic extends FurnitureLogicBase implements IFurnitureLogic
{
    public initialize(definition: IFurnitureDefinition): boolean
    {
        if(!super.initialize(definition)) return false;

        const data = this.createFurnitureData(this.dataKey);

        if(!data || !data.initializeFromFurnitureData(JSON.parse(this.furniture.extraData))) return false;

        this._data = data;

        return true;
    }

    public onEnter(unit: IRoomUnitController): void
    {
        if(!unit) return;

        if(unit.holder instanceof User) this.furniture.room && this.furniture.room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_WALKS_ON_FURNI, unit.holder, this.furniture);
    }

    public onLeave(unit: IRoomUnitController): void
    {
        if(!unit) return;
        
        if(unit.holder instanceof User) this.furniture.room && this.furniture.room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_WALKS_OFF_FURNI, unit.holder, this.furniture);
    }

    public onStop(unit: IRoomUnitController): void
    {
        if(!unit) return;

        if(this.isFurnitureSittable())
        {
            unit.location.sit(true, this.furnitureStackHeight(), this.furniture.position.rotation);

            return;
        }

        if(this.isFurnitureLayable())
        {
            unit.location.lay(true, this.furnitureStackHeight(), this.furniture.position.rotation);

            return;
        }
    }

    public onInteract(user: IUser, state: number = null): void
    {
        if(!user) return;

        if(this.isFurnitureToggleable()) state = this.getNextToggleableState();

        if(!this.setState(state)) return;

        this.furniture.room && this.furniture.room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_STATE_CHANGED, user, this.furniture);
    }

    public setState(state: number = null, refresh: boolean = true): boolean
    {
        if(!this.data) return false;

        if(state === null) state = this.getNextToggleableState();

        if(state === this.data.state) return false;

        this.data.setState(state.toString());

        this.furniture.save();

        if(refresh) this.refreshFurnitureData();

        return true;
    }

    protected getNextToggleableState(): number
    {
        const totalStates = this.definition.totalStates;

        if(!totalStates) return 0;

        return (((this.data && this.data.state) || 0) + 1) % totalStates;
    }
}