import { IMessageEvent, MessageEvent } from '../../../../networking';
import { GamesInitParser } from '../../parser';

export class GamesInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GamesInitParser);
    }

    public getParser(): GamesInitParser
    {
        return this.parser as GamesInitParser;
    }
}