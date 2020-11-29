import { CatalogItem, CatalogPage, FurnitureDefinitionType } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class CatalogPageComposer implements IMessageComposer
{
    private _data: any[];

    constructor(page: CatalogPage, mode: string)
    {        
        this._data = [ page.id, mode, ...this.composePage(page) ];
    }

    private composePage(page: CatalogPage): any[]
    {
        if(!page) return null;

        const data: any[] = [ ...page.layout.composeCatalogLayout(page) ];

        let totalItems = 0;

        const itemData: any[] = [];

        if(page.items && page.items.length)
        {
            for(let item of page.items)
            {
                if(!item) continue;

                itemData.push(...CatalogPageComposer.composeItem(item));

                totalItems++;
            }
        }

        data.push(totalItems, ...itemData, 0, false);

        if(page.layout.name === 'frontpage_featured' || page.layout.name === 'frontpage4') data.push(0);

        return data;
    }

    public static composeItem(item: CatalogItem): any[]
    {
        if(!item) return null;

        const data: any[] = [ item.id, item.productName, false, item.costCredits, item.costCurrency, item.costCurrencyType, false ];

        let totalDefinitions = 0;

        const definitionData: any[] = [];

        if(item.definitions && item.definitions.length)
        {
            for(let definition of item.definitions)
            {
                if(!definition) continue;

                definitionData.push(definition.type.toLowerCase());

                if(definition.type === FurnitureDefinitionType.BADGE)
                {
                    definitionData.push(definition.productName);
                }
                else
                {
                    definitionData.push(definition.spriteId);

                    if(definition.type === FurnitureDefinitionType.ROBOT)
                    {
                        definitionData.push(definition.extraData);
                    }

                    else if(definition.productName === 'landscape' || definition.productName === 'wallpaper' || definition.productName === 'floor')
                    {
                        definitionData.push(definition.productName.split('_')[2]);
                    }

                    else if(definition.productName === 'poster')
                    {
                        definitionData.push(definition.extraData);
                    }

                    else if(definition.productName.startsWith('sound_set_'))
                    {
                        definitionData.push(definition.extraData);
                    }

                    else definitionData.push(null);

                    definitionData.push(1, item.isUnique);

                    if(item.isUnique) definitionData.push(item.uniqueStack, item.uniqueSells);
                }

                totalDefinitions++;
            }
        }

        return [ ...data, totalDefinitions, ...definitionData, (item.clubOnly ? 1 : 0), item.hasOffer, false, `${ item.definitions[0].productName }.png` ];
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