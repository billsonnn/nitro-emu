import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CatalogModeParser } from '../../parser';

export class CatalogModeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogModeParser);
    }

    public getParser(): CatalogModeParser
    {
        return this.parser as CatalogModeParser;
    }
}