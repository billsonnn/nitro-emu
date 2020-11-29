import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CatalogSearchParser } from '../../parser';

export class CatalogSearchEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogSearchParser);
    }

    public getParser(): CatalogSearchParser
    {
        return this.parser as CatalogSearchParser;
    }
}