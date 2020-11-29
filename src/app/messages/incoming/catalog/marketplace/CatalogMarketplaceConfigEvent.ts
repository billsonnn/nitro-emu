import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { CatalogMarketplaceConfigParser } from '../../../parser';

export class CatalogMarketplaceConfigEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogMarketplaceConfigParser);
    }

    public getParser(): CatalogMarketplaceConfigParser
    {
        return this.parser as CatalogMarketplaceConfigParser;
    }
}