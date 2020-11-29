import { TimeHelper } from '../../../../common';
import { GroupRank, IGroup } from '../../../../core';

export class GroupDataComposerUtilities
{
    public static composeSimpleGroupInfo(group: IGroup): any[]
    {
        if(!group) return null;

        const data: any[] = [];

        data.push(group.id, group.details.name, group.details.badge);

        return data;
    }

    public static composeGroupInfo(group: IGroup, newWindow: boolean = true, rank: number, isFavorite: boolean = false, isOwner: boolean = false, isAdmin: boolean = false): any[]
    {
        if(!group) return null;

        const data: any[] = [];

        data.push(group.id, true, group.details.state, group.details.name, group.details.description, group.details.badge, group.details.roomId, group.details.roomName);

        switch(rank)
        {
            case GroupRank.OWNER: rank = 4; break;
            case GroupRank.ADMIN: rank = 3; break;
            case GroupRank.REQUESTED: rank = 2; break;
            case GroupRank.MEMBER: rank = 1; break;
            default: rank = 0; break;
        }

        data.push(rank, group.details.totalMembers, isFavorite, TimeHelper.formatDate(group.details.timestampCreated, 'MMMM DD, YYYY'), isOwner, isAdmin, group.details.userName, newWindow, group.details.memberRights, (isAdmin ? group.details.totalMembersPending : 0), group.details.forumEnabled);

        return data;
    }
}