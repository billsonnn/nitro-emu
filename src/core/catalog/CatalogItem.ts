import { CatalogItemEntity } from '../../database/entities/CatalogItemEntity';
import { IFurnitureDefinition } from '../furniture';
import { CatalogManager } from './CatalogManager';
import { CatalogPage } from './CatalogPage';

export class CatalogItem
{
    private _manager: CatalogManager;
    private _entity: CatalogItemEntity;

    private _page: CatalogPage;
    private _definitions: IFurnitureDefinition[];

    constructor(manager: CatalogManager, entity: CatalogItemEntity)
    {
        if(!(entity instanceof CatalogItemEntity)) throw new Error('invalid_entity');

        this._manager       = manager;
        this._entity        = entity;

        this._page          = null;
        this._definitions   = [];

        if(!this.setDefinitions()) throw new Error('invalid_definition');
    }

    private setDefinitions(): boolean
    {
        this._definitions = [];

        const definition = this._manager.core.furniture.getDefinition(this._entity.definitionId);

        if(!definition) return false;

        this._definitions.push(definition);

        return true;
    }

    public setPage(page: CatalogPage): boolean
    {
        if(!page) return false;

        this._page = page;

        return true;
    }

    public get page(): CatalogPage
    {
        return this._page;
    }

    public get definitions(): IFurnitureDefinition[]
    {
        return this._definitions;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get pageId(): number
    {
        return this._entity.pageId;
    }

    public get productName(): string
    {
        return this._entity.productName;
    }

    public get offerId(): number
    {
        return this._entity.offerId;
    }

    public get costCredits(): number
    {
        return this._entity.costCredits;
    }

    public get costCurrency(): number
    {
        return this._entity.costCurrency;
    }

    public get costCurrencyType(): number
    {
        return this._entity.costCurrencyType;
    }

    public get amount(): number
    {
        return this._entity.amount;
    }

    public get uniqueSells(): number
    {
        return this._entity.uniqueSells;
    }

    public get uniqueStack(): number
    {
        return this._entity.uniqueStack;
    }

    public get uniqueRemaining(): number
    {
        return this._entity.uniqueStack - this._entity.uniqueSells;
    }

    public get isUnique(): boolean
    {
        return this._entity.uniqueStack > 0;
    }

    public get hasOffer(): boolean
    {
        if(this._entity.uniqueStack > 0) return false;

        return this._entity.hasOffer === 1;
    }

    public get clubOnly(): boolean
    {
        return this._entity.clubOnly === 1;
    }

    public get extraData(): string
    {
        return this._entity.extraData;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }
}