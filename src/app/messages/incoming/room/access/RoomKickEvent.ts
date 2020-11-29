import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomKickParser } from '../../../parser';

export class RoomKickEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomKickParser);
    }

    public getParser(): RoomKickParser
    {
        return this.parser as RoomKickParser;
    }
}