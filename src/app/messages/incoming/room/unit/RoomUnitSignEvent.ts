import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomUnitSignParser } from '../../../parser';

export class RoomUnitSignEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitSignParser);
    }

    public getParser(): RoomUnitSignParser
    {
        return this.parser as RoomUnitSignParser;
    }
}