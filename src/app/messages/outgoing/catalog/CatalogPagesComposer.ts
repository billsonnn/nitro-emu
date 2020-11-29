import { CatalogPage } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class CatalogPagesComposer implements IMessageComposer
{
    private _data: any[];

    constructor(mode: string, pages: CatalogPage[])
    {
        let totalPages = 0;

        const data: any[] = [];

        if(pages && pages.length)
        {
            for(let page of pages)
            {
                if(!page) continue;

                data.push(...this.composePage(page));

                totalPages++;
            }
        }

        this._data = [ true, 0, -1, 'root', '', 0, totalPages, ...data, false, mode ];
    }

    private composePage(page: CatalogPage): any[]
    {
        if(!page) return;

        const data: any[] = [
            page.isVisible,
            page.iconImage,
            (page.isVisible ? page.id : -1),
            page.caption,
            page.name,
            ...this.composeOfferIds(page)
        ];

        let totalChildren = 0;

        const childrenData: any[] = [];

        if(page.children && page.children.length)
        {
            for(let child of page.children)
            {
                if(!child) continue;

                childrenData.push(...this.composePage(child));

                totalChildren++;
            }
        }

        return [ ...data, totalChildren, ...childrenData ];
    }

    private composeOfferIds(page: CatalogPage): number[]
    {
        if(!page) return null;

        let totalOfferIds = 0;

        const data: number[] = [];

        if(page.offerIds && page.offerIds.length)
        {
            for(let offerId of page.offerIds)
            {
                if(!offerId) continue;

                data.push(offerId);

                totalOfferIds++;
            }
        }

        return [ totalOfferIds, ...data ];
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