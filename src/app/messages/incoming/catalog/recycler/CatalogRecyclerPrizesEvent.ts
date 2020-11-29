import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { CatalogRecyclerPrizesParser } from '../../../parser';

export class CatalogRecyclerPrizesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogRecyclerPrizesParser);
    }

    public getParser(): CatalogRecyclerPrizesParser
    {
        return this.parser as CatalogRecyclerPrizesParser;
    }
}