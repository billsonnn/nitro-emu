import { IRoomUnitChat } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class RoomUnitChatComposer implements IMessageComposer
{
    private _data: any[];

    constructor(chat: IRoomUnitChat)
    {
        this._data = [ chat.unitId, chat.message, chat.emotion, chat.bubble, 0, chat.message.length ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}