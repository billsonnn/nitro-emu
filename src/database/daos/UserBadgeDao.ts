import { In, Not } from 'typeorm';
import { Application } from '../../app';
import { UserBadgeEntity } from '../entities';

export class UserBadgeDao
{
    public static async loadUserBadges(userId: number): Promise<UserBadgeEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(UserBadgeEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadOneUserBadge(userId: number, badgeCode: string): Promise<UserBadgeEntity>
    {
        if(!userId || !badgeCode) return null;
        
        const result = await Application.instance.core.database.entityManager.findOne(UserBadgeEntity, { where: { userId, badgeCode } });

        if(!result) return null;
        
        return result;
    }

    public static async loadUserCurrentBadges(userId: number): Promise<UserBadgeEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(UserBadgeEntity, { where: { userId, slotNumber: Not(0) }, take: 5 });
        
        if(!results || !results.length) return null;

        return results;
    }

    public static async addBadge(userId: number, ...badgeCodes: string[]): Promise<UserBadgeEntity[]>
    {
        if(!userId) return null;

        const codes                             = [ ...badgeCodes ];
        const addedBadges: UserBadgeEntity[]    = [];

        if(!codes) return null;
        
        const totalCodes = codes.length;

        if(!totalCodes) return null;
        
        for(let i = 0; i < totalCodes; i++)
        {
            const badgeCode = codes[i];

            if(!badgeCode) continue;

            const result = await this.loadOneUserBadge(userId, badgeCode);

            if(result) continue;

            const entity = new UserBadgeEntity();

            entity.userId       = userId;
            entity.badgeCode    = badgeCode;

            addedBadges.push(entity);
        }

        if(!addedBadges.length) return null;
        
        await Application.instance.core.database.entityManager.save(addedBadges);

        return addedBadges;
    }

    public static async removeBadge(userId: number, ...badgeCodes: string[]): Promise<void>
    {
        if(!userId) return;

        const codes = [ ...badgeCodes ];

        if(!codes) return;
        
        const totalCodes = codes.length;

        if(!totalCodes) return;
        
        await Application.instance.core.database.entityManager.delete(UserBadgeEntity, { userId, badgeCode: In(codes) });
    }

    public static async setBadgeSlot(userId: number, badgeCode: string, slotNumber: number): Promise<void>
    {
        if(!userId || !badgeCode || !slotNumber) return;

        await Application.instance.core.database.entityManager.update(UserBadgeEntity, { userId, badgeCode }, { slotNumber });
    }

    public static async resetBadgeSlots(userId: number): Promise<void>
    {
        if(!userId) return;
        
        await Application.instance.core.database.entityManager.update(UserBadgeEntity, { userId }, { slotNumber: 0 });
    }
}