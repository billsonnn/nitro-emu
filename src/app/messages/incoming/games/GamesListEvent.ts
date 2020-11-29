import { IMessageEvent, MessageEvent } from '../../../../networking';
import { GamesListParser } from '../../parser';

export class GamesListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GamesListParser);
    }

    public getParser(): GamesListParser
    {
        return this.parser as GamesListParser;
    }
}