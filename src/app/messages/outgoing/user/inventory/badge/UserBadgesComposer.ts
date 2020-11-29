import { UserBadge } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { UserBadgesComposerUtilities } from './UserBadgesComposerUtilities';

export class UserBadgesComposer implements IMessageComposer
{
    private _data: any[];

    constructor(badges: IterableIterator<UserBadge>)
    {
        let totalBadges = 0;

        const data: any[] = [];

        const currentBadges: UserBadge[] = [];

        if(badges)
        {
            for(let badge of badges)
            {
                if(!badge) continue;

                data.push(badge.id, badge.code);

                if(badge.slot > 0) currentBadges.push(badge);

                totalBadges++;
            }
        }

        this._data = [ totalBadges, ...data, ...UserBadgesComposerUtilities.composeCurrentBadges(currentBadges) ];
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