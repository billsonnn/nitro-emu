import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomRightsRemoveParser } from '../../../../parser';

export class RoomRightsRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsRemoveParser);
    }

    public getParser(): RoomRightsRemoveParser
    {
        return this.parser as RoomRightsRemoveParser;
    }
}