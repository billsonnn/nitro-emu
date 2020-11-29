import { Application } from '../../app';
import { UserFavoriteRoomEntity } from '../entities';

export class UserFavoriteRoomDao
{
    public static async loadUserFavoriteRooms(userId: number): Promise<UserFavoriteRoomEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(UserFavoriteRoomEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async addFavoriteRoom(userId: number, roomId: number): Promise<UserFavoriteRoomEntity>
    {
        if(!userId || !roomId) return;

        const entity = new UserFavoriteRoomEntity();

        entity.userId   = userId;
        entity.roomId   = roomId;

        await Application.instance.core.database.entityManager.save(entity);
        
        return entity;
    }

    public static async removeFavoriteRoom(userId: number, roomId: number): Promise<void>
    {
        if(!userId || !roomId) return;

        await Application.instance.core.database.entityManager.delete(UserFavoriteRoomEntity, { userId, roomId });
    }
}