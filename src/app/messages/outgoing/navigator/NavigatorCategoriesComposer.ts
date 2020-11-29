import { NavigatorCategory } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class NavigatorCategoriesComposer implements IMessageComposer
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

                data.push(
                    category.id,
                    category.name,
                    true, // can access
                    false,
                    null,
                    null,
                    false
                );

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