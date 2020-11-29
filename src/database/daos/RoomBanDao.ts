import { In } from 'typeorm';
import { Application } from '../../app';
import { RoomBanEntity } from '../entities';

export class RoomBanDao
{
    public static async loadBans(roomId: number): Promise<RoomBanEntity[]>
    {
        if(!roomId) return null;
        
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(RoomBanEntity, 'bans')
            .select(['bans.id', 'bans.roomId', 'bans.userId', 'bans.timestampCreated', 'bans.timestampExpires', 'user.id', 'user.username' ])
            .where('bans.roomId = :roomId', { roomId })
            .innerJoin('bans.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async banUser(roomId: number, userId: number, expiration: Date): Promise<RoomBanEntity>
    {
        if(!roomId || !userId) return;
        
        const entity = new RoomBanEntity();

        entity.roomId           = roomId;
        entity.userId           = userId;
        entity.timestampExpires = expiration;

        await Application.instance.core.database.entityManager.save(entity);

        return entity;
    }

    public static async removeBan(roomId: number, ...userIds: number[]): Promise<void>
    {
        if(!roomId) return;

        userIds = [ ...userIds ];

        if(!userIds || !userIds.length) return;
        
        await Application.instance.core.database.entityManager.delete(RoomBanEntity, { roomId, userId: In(userIds) });
    }
}