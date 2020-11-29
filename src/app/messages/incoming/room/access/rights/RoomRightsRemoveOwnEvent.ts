import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomRightsRemoveOwnParser } from '../../../../parser';

export class RoomRightsRemoveOwnEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsRemoveOwnParser);
    }

    public getParser(): RoomRightsRemoveOwnParser
    {
        return this.parser as RoomRightsRemoveOwnParser;
    }
}