import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomModelParser } from '../../../parser';

export class RoomModelEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomModelParser);
    }

    public getParser(): RoomModelParser
    {
        return this.parser as RoomModelParser;
    }
}