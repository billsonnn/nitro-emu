import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomUnitSitParser } from '../../../parser';

export class RoomUnitSitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitSitParser);
    }

    public getParser(): RoomUnitSitParser
    {
        return this.parser as RoomUnitSitParser;
    }
}