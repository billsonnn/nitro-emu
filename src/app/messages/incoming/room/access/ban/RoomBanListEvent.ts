import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomBanListParser } from '../../../../parser';

export class RoomBanListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomBanListParser);
    }

    public getParser(): RoomBanListParser
    {
        return this.parser as RoomBanListParser;
    }
}