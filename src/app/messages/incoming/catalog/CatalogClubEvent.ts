import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CatalogClubParser } from '../../parser';

export class CatalogClubEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogClubParser);
    }

    public getParser(): CatalogClubParser
    {
        return this.parser as CatalogClubParser;
    }
}