import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserRoomLikeParser } from '../../../../parser';

export class UserRoomLikeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserRoomLikeParser);
    }

    public getParser(): UserRoomLikeParser
    {
        return this.parser as UserRoomLikeParser;
    }
}