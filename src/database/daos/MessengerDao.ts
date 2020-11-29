import { Application } from '../../app';
import { MessengerCategoryEntity, MessengerFriendEntity, MessengerRequestEntity } from '../entities';

export class MessengerDao
{
    public static async loadCategories(userId: number): Promise<MessengerCategoryEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager.find(MessengerCategoryEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadFriends(userId: number): Promise<MessengerFriendEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(MessengerFriendEntity, 'friendship')
            .select(['friendship.id', 'friendship.userId', 'friendship.friendId', 'friendship.categoryId', 'friendship.relation', 'friend.id', 'friend.username', 'friend.motto', 'friend.gender', 'friend.figure', 'friend.online' ])
            .where('friendship.userId = :userId', { userId })
            .innerJoin('friendship.friend', 'friend')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadRequests(userId: number): Promise<MessengerRequestEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(MessengerRequestEntity, 'request')
            .select(['request.id', 'request.userId', 'request.requestedId', 'user.id', 'user.username', 'user.figure' ])
            .where('request.requestedId = :userId', { userId })
            .innerJoin('request.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadRelationships(userId: number): Promise<MessengerFriendEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(MessengerFriendEntity, 'friendship')
            .select(['friendship.id', 'friendship.userId', 'friendship.friendId', 'friendship.categoryId', 'friendship.relation', 'friend.id', 'friend.username', 'friend.figure' ])
            .where('friendship.userId = :userId', { userId })
            .andWhere('friendship.relation > :relation', { relation: '0' })
            .innerJoin('friendship.friend', 'friend')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadRequestsSent(userId: number): Promise<MessengerRequestEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager.find(MessengerRequestEntity, { select: ['id', 'requestedId'], where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async addFriend(userId: number, friendId: number): Promise<MessengerFriendEntity>
    {
        if(!userId || !friendId) return;

        const entity = new MessengerFriendEntity();

        entity.userId    = userId;
        entity.friendId  = friendId;

        await Application.instance.core.database.entityManager.save(entity);

        return entity;
    }

    public static async removeFriend(userId: number, friendId: number): Promise<void>
    {
        if(!userId || !friendId) return;
        
        await Application.instance.core.database.entityManager.delete(MessengerFriendEntity, { userId, friendId });

        await Application.instance.core.database.entityManager.delete(MessengerFriendEntity, { userId: friendId, friendId: userId });
    }

    public static async updateRelationship(userId: number, friendId: number, relation: number): Promise<void>
    {
        if(!userId || !friendId || relation < 0 || relation > 3) return;

        await Application.instance.core.database.entityManager.update(MessengerFriendEntity, { userId, friendId }, { relation });
    }

    public static async removeRequest(userId: number, requestedId: number): Promise<void>
    {
        if(!userId || !requestedId) return;
        
        await Application.instance.core.database.entityManager.delete(MessengerRequestEntity, { userId, requestedId });

        await Application.instance.core.database.entityManager.delete(MessengerRequestEntity, { userId: requestedId, requestedId: userId });
    }

    public static async removeAllRequests(userId: number): Promise<void>
    {
        if(!userId) return;
        
        await Application.instance.core.database.entityManager.delete(MessengerRequestEntity, { requestedId: userId });
    }
}