import { NavigatorCategory } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class NavigatorEventCategoriesComposer implements IMessageComposer
{
    private _data: any[];

    constructor(categories: IterableIterator<NavigatorCategory> | NavigatorCategory[])
    {
        let totalCategories = 0;

        const data: any[] = [];

        this._data = [ totalCategories, ...data ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}