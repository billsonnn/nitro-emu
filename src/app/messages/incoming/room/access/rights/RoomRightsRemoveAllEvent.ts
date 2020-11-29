import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomRightsRemoveAllParser } from '../../../../parser';

export class RoomRightsRemoveAllEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsRemoveAllParser);
    }

    public getParser(): RoomRightsRemoveAllParser
    {
        return this.parser as RoomRightsRemoveAllParser;
    }
}