import { FurnitureDefinitionEntity } from '../../../database';
import { IFurnitureDefinition } from './IFurnitureDefinition';

export class FurnitureDefinition implements IFurnitureDefinition
{
    private static DEFAULT_STACK_HEIGHT = 0.001;

    private _entity: FurnitureDefinitionEntity;

    private _multiHeights: Map<number, number>;

    constructor(entity: FurnitureDefinitionEntity)
    {
        if(!(entity instanceof FurnitureDefinitionEntity)) throw new Error('invalid_entity');

        this._entity        = entity;

        this._multiHeights  = new Map();

        this.loadMultiHeights();
    }

    private loadMultiHeights(): void
    {
        this._multiHeights.clear();

        const multiHeights = this._entity.multiHeights;

        if(!multiHeights) return;

        const heights = multiHeights.split(',').map(octet => parseFloat(octet));
        
        for(let i = 0; i < heights.length; i++) this._multiHeights.set(i, heights[i]);
    }

    public get multiHeights(): Map<number, number>
    {
        return this._multiHeights;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get publicName(): string
    {
        return this._entity.publicName;
    }

    public get productName(): string
    {
        return this._entity.productName;
    }

    public get spriteId(): number
    {
        return this._entity.spriteId;
    }

    public get type(): string
    {
        return this._entity.type;
    }

    public get width(): number
    {
        return this._entity.width;
    }

    public get length(): number
    {
        return this._entity.length;
    }

    public get stackHeight(): number
    {
        return this._entity.stackHeight;
    }

    public get logicType(): string
    {
        return this._entity.interaction;
    }

    public get totalStates(): number
    {
        return (this._entity.totalStates || 0);
    }

    public get canToggle(): boolean
    {
        return (this.totalStates > 1);
    }

    public get canStack(): boolean
    {
        return (this._entity.canStack === 1);
    }

    public get canWalk(): boolean
    {
        return ((this._entity.canWalk === 1) || this.canSit || this.canLay);
    }

    public get canSit(): boolean
    {
        return (this._entity.canSit === 1);
    }

    public get canLay(): boolean
    {
        return (this._entity.canLay === 1);
    }

    public get canRecycle(): boolean
    {
        return (this._entity.canRecycle === 1);
    }

    public get canTrade(): boolean
    {
        return (this._entity.canTrade === 1);
    }

    public get canInventoryStack(): boolean
    {
        return (this._entity.canInventoryStack === 1);
    }

    public get canSell(): boolean
    {
        return (this._entity.canSell === 1);
    }

    public get extraData(): string
    {
        return this._entity.extraData;
    }
}