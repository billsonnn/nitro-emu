import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomRightsGiveParser } from '../../../../parser';

export class RoomRightsGiveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsGiveParser);
    }

    public getParser(): RoomRightsGiveParser
    {
        return this.parser as RoomRightsGiveParser;
    }
}