import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomBanGiveParser } from '../../../../parser';

export class RoomBanGiveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomBanGiveParser);
    }

    public getParser(): RoomBanGiveParser
    {
        return this.parser as RoomBanGiveParser;
    }
}