import { UserBadge } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { UserBadgesComposerUtilities } from './UserBadgesComposerUtilities';

export class UserBadgesCurrentComposer implements IMessageComposer
{
    private _data: any[];

    constructor(userId: number, badges: UserBadge[])
    {
        this._data = [ ];

        this._data.push(...UserBadgesComposerUtilities.composeCurrentBadges(badges));

        this._data.unshift(userId);
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