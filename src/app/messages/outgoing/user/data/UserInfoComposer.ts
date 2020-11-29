import { IUser } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class UserInfoComposer implements IMessageComposer
{
    private _data: any[];

    constructor(user: IUser)
    {
        this._data = [
            user.id,
            user.details.username,
            user.details.figure,
            user.details.gender.toUpperCase(),
            user.details.motto,
            user.details.username, // realname / nickname
            false,
            user.details.respectsReceived,
            user.details.respectsRemaining,
            user.details.respectsPetRemaining,
            false,
            '01-01-1970 00:00:00',
            false, // can name change
            false
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