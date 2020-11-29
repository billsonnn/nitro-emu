import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomUnitTypingStartParser } from '../../../../parser';

export class RoomUnitTypingStartEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitTypingStartParser);
    }

    public getParser(): RoomUnitTypingStartParser
    {
        return this.parser as RoomUnitTypingStartParser;
    }
}