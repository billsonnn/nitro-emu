import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { CatalogDiscountConfigParser } from '../../../parser';

export class CatalogDiscountConfigEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogDiscountConfigParser);
    }

    public getParser(): CatalogDiscountConfigParser
    {
        return this.parser as CatalogDiscountConfigParser;
    }
}