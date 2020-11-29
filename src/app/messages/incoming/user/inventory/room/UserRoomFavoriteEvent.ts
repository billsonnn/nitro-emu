import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserRoomFavoriteParser } from '../../../../parser';

export class UserRoomFavoriteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserRoomFavoriteParser);
    }

    public getParser(): UserRoomFavoriteParser
    {
        return this.parser as UserRoomFavoriteParser;
    }
}