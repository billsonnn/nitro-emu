import { FurnitureDataComposer, FurnitureFloorUpdateComposer, FurnitureStateComposer } from '../../../app';
import { IRoomUnitController } from '../../room';
import { IUser } from '../../user';
import { FurnitureDataFactory, FurnitureDataKey, IFurnitureData, LegacyDataType } from '../data';
import { IFurnitureDefinition } from '../definition';
import { IFurniture } from '../interfaces';
import { IFurnitureLogic } from './interfaces';

export class FurnitureLogicBase implements IFurnitureLogic
{
    private _furniture: IFurniture;
    private _definition: IFurnitureDefinition;

    protected _data: IFurnitureData;

    constructor()
    {
        this._furniture     = null;
        this._definition    = null;
        
        this._data          = null;
    }

    public initialize(definition: IFurnitureDefinition): boolean
    {
        if(!definition) return false;

        this._definition = definition;

        return true;
    }

    public dispose(): void
    {
        this.cleanUp();

        if(this._furniture)
        {
            this._furniture.save();

            this._furniture = null;
        }

        this._definition    = null;
        this._data          = null;
    }

    public setFurniture(furniture: IFurniture): void
    {
        this._furniture = furniture;
    }

    protected createFurnitureData(key: number): IFurnitureData
    {
        const data = FurnitureDataFactory.createData(key);

        if(!data) return null;

        return data;
    }

    public onReady(): boolean
    {
        return true;
    }

    public onEnter(unit: IRoomUnitController): void
    {
        if(!unit) return;
    }

    public onLeave(unit: IRoomUnitController): void
    {
        if(!unit) return;
    }

    public beforeStep(unit: IRoomUnitController): void
    {
        if(!unit) return;
    }

    public onStep(unit: IRoomUnitController): void
    {
        if(!unit) return;
    }

    public onStop(unit: IRoomUnitController): void
    {
        if(!unit) return;
    }

    public onPlace(user: IUser): void
    {
        if(!user) return;
    }

    public onMove(user: IUser): void
    {
        if(!user) return;
    }

    public onPickup(user: IUser): void
    {
        this.cleanUp();
    }

    public onInteract(user: IUser, state: number = null): void
    {
        if(!user) return;
    }

    public setState(state: number = null, refresh: boolean = true): boolean
    {
        return false;
    }

    public isFurnitureStackable(): boolean
    {
        return (this.definition && this.definition.canStack) || false;
    }

    public isFurnitureWalkable(): boolean
    {
        return (this.definition && this.definition.canWalk) || false;
    }

    public isFurnitureSittable(): boolean
    {
        return (this.definition && this.definition.canSit) || false;
    }

    public isFurnitureLayable(): boolean
    {
        return (this.definition && this.definition.canLay) || false;
    }

    public isFurnitureOpen(): boolean
    {
        return (this.isFurnitureWalkable() || this.isFurnitureSittable() || this.isFurnitureLayable()) || false;
    }

    public isFurnitureRollable(): boolean
    {
        return true;
    }

    public furnitureStackHeight(): number
    {
        return (this.definition && this.definition.stackHeight) || 0;
    }

    public isFurnitureToggleable(): boolean
    {
        return true;
    }

    public refreshFurniture(): void
    {
        if(!this._furniture.room) return;

        this._furniture.room.unit.processComposer(new FurnitureFloorUpdateComposer(this._furniture));
    }

    public refreshFurnitureData(): void
    {
        if(!this._furniture.room) return;

        if(this._data instanceof LegacyDataType)
        {
            this._furniture.room.unit.processComposer(new FurnitureStateComposer(this._furniture.id, this._data.state));

            return;
        }
        
        this._furniture.room.unit.processComposer(new FurnitureDataComposer(this._furniture.id, ...this._data.getMessageArray()));
    }

    protected cleanUp(): void
    {
        return;
    }

    public get furniture(): IFurniture
    {
        return this._furniture;
    }

    public get definition(): IFurnitureDefinition
    {
        return this._definition;
    }

    public get data(): IFurnitureData
    {
        return this._data;
    }

    public get dataKey(): number
    {
        return FurnitureDataKey.LEGACY_KEY;
    }
}