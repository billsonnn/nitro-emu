import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomUnitLookParser } from '../../../parser';

export class RoomUnitLookEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitLookParser);
    }

    public getParser(): RoomUnitLookParser
    {
        return this.parser as RoomUnitLookParser;
    }
}