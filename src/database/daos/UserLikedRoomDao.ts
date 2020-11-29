import { Application } from '../../app';
import { UserLikedRoomEntity } from '../entities';

export class UserLikedRoomDao
{
    public static async loadUserLikedRooms(userId: number): Promise<UserLikedRoomEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(UserLikedRoomEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async addLikedRoom(userId: number, roomId: number): Promise<UserLikedRoomEntity>
    {
        if(!userId || !roomId) return;

        const entity = new UserLikedRoomEntity();

        entity.userId   = userId;
        entity.roomId   = roomId;

        await Application.instance.core.database.entityManager.save(entity);
        
        return entity;
    }

    public static async removeLikedRoom(userId: number, roomId: number): Promise<void>
    {
        if(!userId || !roomId) return;

        await Application.instance.core.database.entityManager.delete(UserLikedRoomEntity, { userId, roomId });
    }
}