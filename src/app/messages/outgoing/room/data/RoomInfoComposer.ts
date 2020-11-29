import { IRoom } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { RoomDataComposerUtilities } from './RoomDataComposerUtilities';

export class RoomInfoComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom, enterRoom: boolean = false, forwardRoom: boolean = false, canRoomMute: boolean = false)
    {
        this._data = [ enterRoom ];

        this._data.push(...RoomDataComposerUtilities.composeRoomInfo(room));

        this._data.push(
            forwardRoom,
            false,
            false, // has group membership
            room.security.isRoomMuted,
            room.details.allowMute,
            room.details.allowKick,
            room.details.allowBan,
            canRoomMute
        );
        
        this._data.push(...RoomDataComposerUtilities.composeChatSettings(room));
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