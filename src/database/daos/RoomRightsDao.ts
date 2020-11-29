import { In } from 'typeorm';
import { Application } from '../../app';
import { RoomRightsEntity } from '../entities';

export class RoomRightsDao
{
    public static async loadUserRightsRooms(userId: number): Promise<RoomRightsEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(RoomRightsEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadRights(roomId: number): Promise<RoomRightsEntity[]>
    {
        if(!roomId) return null;
        
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(RoomRightsEntity, 'rights')
            .select(['rights.id', 'rights.roomId', 'rights.userId', 'user.id', 'user.username' ])
            .where('rights.roomId = :roomId', { roomId })
            .innerJoin('rights.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async giveRights(roomId: number, userId: number): Promise<RoomRightsEntity>
    {
        if(!roomId || !userId) return;
        
        const entity = new RoomRightsEntity();

        entity.roomId = roomId;
        entity.userId = userId;

        await Application.instance.core.database.entityManager.save(entity);

        return entity;
    }

    public static async removeRights(roomId: number, ...userIds: number[]): Promise<void>
    {
        if(!roomId) return;

        userIds = [ ...userIds ];

        if(!userIds || !userIds.length) return;
        
        await Application.instance.core.database.entityManager.delete(RoomRightsEntity, { roomId, userId: In(userIds) });
    }

    public static async removeAllRights(roomId: number): Promise<void>
    {
        if(!roomId) return;

        await Application.instance.core.database.entityManager.delete(RoomRightsEntity, { roomId });
    }
}