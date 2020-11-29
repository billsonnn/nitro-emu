import { Application } from '../../app';
import { FurnitureEntity } from '../entities';

export class FurnitureDao
{
    public static async loadRoomFurniture(roomId: number): Promise<FurnitureEntity[]>
    {
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(FurnitureEntity, 'furniture')
            .select(['furniture', 'user.id', 'user.username'])
            .where('furniture.roomId = :roomId', { roomId })
            .innerJoin('furniture.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadUserFurniture(userId: number): Promise<FurnitureEntity[]>
    {
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(FurnitureEntity, 'furniture')
            .select(['furniture'])
            .where('furniture.roomId IS NULL')
            .andWhere('furniture.userId = :userId', { userId })
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }
}