import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CatalogPurchaseParser } from '../../parser';

export class CatalogPurchaseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPurchaseParser);
    }

    public getParser(): CatalogPurchaseParser
    {
        return this.parser as CatalogPurchaseParser;
    }
}