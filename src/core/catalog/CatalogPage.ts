import { CatalogPageEntity } from '../../database';
import { CatalogItem } from './CatalogItem';
import { CatalogManager } from './CatalogManager';
import { CatalogLayout } from './layouts';

export class CatalogPage
{
    private _manager: CatalogManager;
    private _entity: CatalogPageEntity;

    private _layout: CatalogLayout;
    private _items: CatalogItem[];
    private _offerIds: number[];

    private _parent: CatalogPage;
    private _children: CatalogPage[];

    constructor(manager: CatalogManager, entity: CatalogPageEntity)
    {
        if(!(entity instanceof CatalogPageEntity)) throw new Error('invalid_entity');

        this._manager   = manager;
        this._entity    = entity;

        this._layout    = null;
        this._items     = [];
        this._offerIds  = [];

        this._parent    = null;
        this._children  = [];

        if(!this.setLayout()) throw new Error('invalid_layout');
    }

    private setLayout(): boolean
    {
        if(this._layout) return true;

        const layout = this._manager.getLayout(this._entity.layout);

        if(!layout) return false;

        this._layout = layout;

        return true;
    }

    public addItem(item: CatalogItem): boolean
    {
        if(!item) return false;

        if(!item.setPage(this)) return false;

        this._items.push(item);

        return true;
    }

    public addChild(page: CatalogPage): void
    {
        if(!page) return;

        if(this._children.indexOf(page) >= 0) return;

        this._children.push(page);

        page.setParent(this);
    }

    private setParent(page: CatalogPage): void
    {
        if(!page) return;

        this._parent = page;
    }

    public get items(): CatalogItem[]
    {
        return this._items;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get parentId(): number
    {
        return this._entity.parentId;
    }

    public get name(): string
    {
        return this._entity.name;
    }

    public get caption(): string
    {
        return this._entity.caption;
    }

    public get layout(): CatalogLayout
    {
        return this._layout;
    }

    public get offerIds(): number[]
    {
        return this._offerIds;
    }

    public get parent(): CatalogPage
    {
        return this._parent;
    }

    public get children(): CatalogPage[]
    {
        return this._children;
    }

    public get imageHeader(): string
    {
        return this._entity.imageHeader;
    }

    public get imageTeaser(): string
    {
        return this._entity.imageTeaser;
    }

    public get imageSpecial(): string
    {
        return this._entity.imageSpecial;
    }

    public get textHeader(): string
    {
        return this._entity.textHeader;
    }

    public get textDetails(): string
    {
        return this._entity.textDetails;
    }

    public get textTeaser(): string
    {
        return this._entity.textTeaser;
    }

    public get minRank(): number
    {
        return this._entity.minRank;
    }

    public get isVisible(): boolean
    {
        return this._entity.isVisible === 1;
    }

    public get iconImage(): number
    {
        return this._entity.iconImage || 0;
    }
}