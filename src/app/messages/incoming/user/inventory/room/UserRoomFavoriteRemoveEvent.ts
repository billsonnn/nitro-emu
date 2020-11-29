import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserRoomFavoriteRemoveParser } from '../../../../parser';

export class UserRoomFavoriteRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserRoomFavoriteRemoveParser);
    }

    public getParser(): UserRoomFavoriteRemoveParser
    {
        return this.parser as UserRoomFavoriteRemoveParser;
    }
}