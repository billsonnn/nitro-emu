import { CatalogPage } from '../CatalogPage';

export abstract class CatalogLayout
{
    private _name: string;

    constructor(name: string)
    {
        if(!name) throw new Error('invalid_layout');

        this._name = name;
    }

    public abstract composeCatalogLayout(page: CatalogPage): any[];

    public get name(): string
    {
        return this._name;
    }
}