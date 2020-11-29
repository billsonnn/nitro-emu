import { TimeHelper } from '../../../../../common';
import { IUser } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class UserProfileComposer implements IMessageComposer
{
    private _data: any[];

    constructor(user: IUser, isFriend: boolean = false, isRequested: boolean = false)
    {
        this._data = [
            user.details.id,
            user.details.username,
            user.details.figure,
            user.details.motto,
            TimeHelper.formatDate(user.details.timestampCreated, 'MMMM DD, YYYY'),
            user.details.achievementScore,
            user.messenger.totalFriends, // totalfriends
            isFriend,
            isFriend ? false : isRequested,
            user.details.online,
            0, // groups,
            Math.round(TimeHelper.between(user.details.lastOnline, TimeHelper.now, 'seconds')),
            true
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