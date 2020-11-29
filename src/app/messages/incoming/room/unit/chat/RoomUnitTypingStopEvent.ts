import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomUnitTypingStopParser } from '../../../../parser';

export class RoomUnitTypingStopEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitTypingStopParser);
    }

    public getParser(): RoomUnitTypingStopParser
    {
        return this.parser as RoomUnitTypingStopParser;
    }
}