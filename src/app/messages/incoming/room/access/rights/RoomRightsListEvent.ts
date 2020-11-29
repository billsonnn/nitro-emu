import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomRightsListParser } from '../../../../parser';

export class RoomRightsListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsListParser);
    }

    public getParser(): RoomRightsListParser
    {
        return this.parser as RoomRightsListParser;
    }
}