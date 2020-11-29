import { IRoom, NavigatorSearchResultRoom } from '../../../../../core';
import { GroupDataComposerUtilities } from '../../group';

export class RoomDataComposerUtilities
{
    private static THUMBNAIL_BITMASK         = 1;
    private static GROUPDATA_BITMASK         = 2;
    private static ROOMAD_BITMASK            = 4;
    private static SHOWOWNER_BITMASK         = 8;
    private static ALLOW_PETS_BITMASK        = 16;
    private static DISPLAY_ROOMAD_BITMASK    = 32;

    public static composeRoomInfo(room: IRoom): any[]
    {
        if(!room) return null;

        const data: any[] = [];

        data.push(room.id, room.details.name);

        const isPublic = (room.category && room.category.isPublic) || false;

        if(isPublic) data.push(0, null);
        else data.push(room.details.ownerId, room.details.ownerName);

        data.push(
            room.details.state,
            room.details.usersNow,
            room.details.usersMax,
            room.details.description,
            room.details.tradeType,
            2,
            room.details.totalLikes,
            room.details.categoryId, // category id
            0 // tags foreach string
        );

        let bitmask = 0;

        if(room.group) bitmask += RoomDataComposerUtilities.GROUPDATA_BITMASK;

        if(!isPublic) bitmask += RoomDataComposerUtilities.SHOWOWNER_BITMASK;

        if(room.details.allowPets) bitmask += RoomDataComposerUtilities.ALLOW_PETS_BITMASK;

        // promoted + RoomComposerUtilities.ROOMAD_BITMASK

        data.push(bitmask);

        if(room.group) data.push(...GroupDataComposerUtilities.composeSimpleGroupInfo(room.group));

        return data;
    }

    public static composeRoomSearchInfo(room: NavigatorSearchResultRoom): any[]
    {
        if(!room) return null;

        const data: any[] = [];

        data.push(room.id, room.name);

        if(room.isPublic) data.push(0, null);
        else data.push(room.ownerId, room.ownerName);

        data.push(
            room.state,
            room.usersNow,
            room.usersMax,
            room.description,
            room.tradeType,
            0,
            room.totalLikes,
            room.categoryId, // category id
            0 // tags foreach string
        );

        let bitmask = 0;

        if(!room.isPublic) bitmask += RoomDataComposerUtilities.SHOWOWNER_BITMASK;

        if(room.allowPets) bitmask += RoomDataComposerUtilities.ALLOW_PETS_BITMASK;

        // promoted + RoomComposerUtilities.ROOMAD_BITMASK

        data.push(bitmask);

        return data;
    }

    public static composeChatSettings(room: IRoom): any[]
    {
        return [
            room.details.chatMode,
            room.details.chatWeight,
            room.details.chatSpeed,
            room.details.chatDistance,
            room.details.chatProtection,
        ];
    }

    public static composeModerationSettings(room: IRoom): any[]
    {
        return [
            false,
            room.details.allowMute,
            room.details.allowKick,
            room.details.allowBan
        ];
    }
}