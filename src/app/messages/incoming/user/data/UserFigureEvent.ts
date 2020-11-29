import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserFigureParser } from '../../../parser';

export class UserFigureEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserFigureParser);
    }

    public getParser(): UserFigureParser
    {
        return this.parser as UserFigureParser;
    }
}