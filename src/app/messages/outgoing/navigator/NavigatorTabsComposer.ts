import { NavigatorTab } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class NavigatorTabsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(tabs: IterableIterator<NavigatorTab> | NavigatorTab[])
    {
        let totalTabs = 0;

        const data: any[] = [];

        if(tabs)
        {
            for(let tab of tabs)
            {
                if(!tab) continue;

                data.push(tab.name, 0);

                totalTabs++;
            }
        }

        this._data = [ totalTabs, ...data ];
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