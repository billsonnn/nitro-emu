import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CatalogPageParser } from '../../parser';

export class CatalogPageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPageParser);
    }

    public getParser(): CatalogPageParser
    {
        return this.parser as CatalogPageParser;
    }
}