import { NavigatorCategory } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class NavigatorCollapsedCategoriesComposer implements IMessageComposer
{
    private _data: any[];

    constructor(categories: IterableIterator<NavigatorCategory> | NavigatorCategory[])
    {
        let totalCategories = 0;

        const data: any[] = [];

        if(categories)
        {
            for(let category of categories)
            {
                if(!category) continue;

                data.push(category.name);

                totalCategories++;
            }
        }

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