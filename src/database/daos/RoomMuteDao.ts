import { In } from 'typeorm';
import { Application } from '../../app';
import { RoomMuteEntity } from '../entities';

export class RoomMuteDao
{
    public static async loadMutes(roomId: number): Promise<RoomMuteEntity[]>
    {
        if(!roomId) return null;
        
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(RoomMuteEntity, 'mutes')
            .select(['mutes.id', 'mutes.roomId', 'mutes.userId', 'mutes.timestampCreated', 'mutes.timestampExpires', 'user.id', 'user.username' ])
            .where('mutes.roomId = :roomId', { roomId })
            .innerJoin('mutes.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async muteUser(roomId: number, userId: number, expiration: Date): Promise<RoomMuteEntity>
    {
        if(!roomId || !userId) return;
        
        const entity = new RoomMuteEntity();

        entity.roomId           = roomId;
        entity.userId           = userId;
        entity.timestampExpires = expiration;

        await Application.instance.core.database.entityManager.save(entity);

        return entity;
    }

    public static async removeMute(roomId: number, ...userIds: number[]): Promise<void>
    {
        if(!roomId) return;

        userIds = [ ...userIds ];

        if(!userIds || !userIds.length) return;
        
        await Application.instance.core.database.entityManager.delete(RoomMuteEntity, { roomId, userId: In(userIds) });
    }
}