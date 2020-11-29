import { IMessageEvent, MessageEvent } from '../../../../networking';
import { NavigatorPromotedRoomsParser } from '../../parser';

export class NavigatorPromotedRoomsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorPromotedRoomsParser);
    }

    public getParser(): NavigatorPromotedRoomsParser
    {
        return this.parser as NavigatorPromotedRoomsParser;
    }
}