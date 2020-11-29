import { UserBadge } from '../../../../../../core';

export class UserBadgesComposerUtilities
{
    public static composeCurrentBadges(badges: UserBadge[]): any[]
    {
        let totalBadges = 0;

        const data: any[] = [];

        if(badges)
        {
            for(let badge of badges)
            {
                if(!badge) continue;

                data.push(badge.slot, badge.code);

                totalBadges++;
            }
        }
        
        return [ totalBadges, ...data ];
    }
}