import { Application } from '../../app';
import { UserSubscriptionEntity } from '../entities';

export class UserSubscriptionDao
{
    public static async createSubscription(userId: number, name: string, timestampExpires: Date): Promise<UserSubscriptionEntity>
    {
        if(!userId) return null;
        
        const entity = new UserSubscriptionEntity();

        entity.userId              = userId;
        entity.name                = name;
        entity.timestampExpires    = timestampExpires;

        await Application.instance.core.database.entityManager.save(entity);
        
        return entity;
    }

    public static async loadSubscriptions(userId: number): Promise<UserSubscriptionEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager.find(UserSubscriptionEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }
}