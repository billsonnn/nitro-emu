import { IRoom } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { RoomDataComposerUtilities } from './RoomDataComposerUtilities';

export class RoomSettingsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom)
    {
        this._data = [
            room.id,
            room.details.name,
            room.details.description,
            room.details.state,
            room.details.categoryId,
            room.details.usersMax,
            room.details.usersMax,
            0, // tags each string
            room.details.tradeType,
            room.details.allowPets ? 1 : 0,
            room.details.allowPetsEat ? 1 : 0,
            room.details.allowWalkThrough ? 1 : 0,
            room.details.hideWalls ? 1 : 0,
            room.details.thicknessWall,
            room.details.thicknessFloor,
            ...RoomDataComposerUtilities.composeChatSettings(room),
            ...RoomDataComposerUtilities.composeModerationSettings(room)
        ];
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