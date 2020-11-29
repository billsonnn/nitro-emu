import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { CatalogGiftConfigParser } from '../../../parser';

export class CatalogGiftConfigEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogGiftConfigParser);
    }

    public getParser(): CatalogGiftConfigParser
    {
        return this.parser as CatalogGiftConfigParser;
    }
}