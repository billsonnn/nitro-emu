import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomEnterParser } from '../../../parser';

export class RoomEnterEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEnterParser);
    }

    public getParser(): RoomEnterParser
    {
        return this.parser as RoomEnterParser;
    }
}