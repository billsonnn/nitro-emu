import { Application } from '../../app';
import { RoomEntity } from '../entities/RoomEntity';

export class RoomDao
{
    public static async loadRoom(id: number): Promise<RoomEntity>
    {
        if(!id) return null;

        const result = await Application.instance.core.database.entityManager
            .createQueryBuilder(RoomEntity, 'room')
            .select(['room'])
            .where('room.id = :id', { id })
            .loadRelationCountAndMap('room.totalLikes', 'room.userLikes')
            .getOne();

        if(!result) return null;

        return result;
    }

    public static async deleteRoom(id: number): Promise<void>
    {
        await Application.instance.core.database.entityManager.delete(RoomEntity, { id });
    }
}