import { NavigatorTabEntity } from '../../database';
import { NavigatorCategory } from './NavigatorCategory';

export class NavigatorTab
{
    private _entity: NavigatorTabEntity;

    private _categories: NavigatorCategory[];
    private _categoryIds: number[];
    private _includes: string[];

    constructor(entity: NavigatorTabEntity)
    {
        if(!(entity instanceof NavigatorTabEntity)) throw new Error('invalid_tab');

        this._entity        = entity;

        this._categories    = [];
        this._categoryIds   = [];
        this._includes      = (this._entity.includes && this._entity.includes.split(',')) || [];
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get name(): string
    {
        return this._entity.name;
    }

    public get categoryIdsString(): string
    {
        return this._entity.categoryIds;
    }

    public get categories(): NavigatorCategory[]
    {
        return this._categories;
    }

    public get categoryIds(): number[]
    {
        return this._categoryIds;
    }

    public get includes(): string[]
    {
        return this._includes;
    }
}