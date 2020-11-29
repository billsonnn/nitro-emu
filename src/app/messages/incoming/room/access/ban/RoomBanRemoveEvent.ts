import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomBanRemoveParser } from '../../../../parser';

export class RoomBanRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomBanRemoveParser);
    }

    public getParser(): RoomBanRemoveParser
    {
        return this.parser as RoomBanRemoveParser;
    }
}