import { IRoom } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { RoomDataComposerUtilities } from './RoomDataComposerUtilities';

export class RoomChatSettingsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom)
    {
        this._data = [ ...RoomDataComposerUtilities.composeChatSettings(room) ];
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