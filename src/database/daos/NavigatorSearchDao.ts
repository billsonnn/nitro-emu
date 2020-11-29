import { Application } from '../../app';
import { RoomEntity } from '../entities';

export class NavigatorSearchDao
{
    public static async findRoomsByCategory(categoryId: number, limit: number): Promise<RoomEntity[]>
    {
        if(!categoryId) return null;

        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(RoomEntity, 'room')
            .select(['room.id', 'room.name', 'room.description', 'room.ownerId', 'room.ownerName', 'room.state', 'room.categoryId', 'room.allowPets', 'room.usersNow', 'room.usersMax', 'room.tradeType'])
            .where('room.categoryId = :categoryId', { categoryId })
            .orderBy('room.usersNow', 'DESC')
            .take(limit)
            .loadRelationCountAndMap('room.totalLikes', 'room.userLikes')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async findRoomsByOwner(search: string, categoryIds: number[], limit: number): Promise<RoomEntity[]>
    {
        if(!search) return null;

        const builder = Application.instance.core.database.entityManager.createQueryBuilder(RoomEntity, 'room');
        
        builder
            .select(['room.id', 'room.name', 'room.description', 'room.ownerId', 'room.ownerName', 'room.state', 'room.categoryId', 'room.allowPets', 'room.usersNow', 'room.usersMax', 'room.tradeType'])
            .where('room.ownerName = :name', { name: search });

        if(categoryIds && categoryIds.length) builder.andWhere('room.categoryId IN (:categoryIds)', { categoryIds });
        
        builder
            .orderBy('room.usersNow', 'DESC')
            .take(limit)
            .loadRelationCountAndMap('room.totalLikes', 'room.userLikes');
        
        const results = await builder.getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async findRoomsByName(search: string, categoryIds: number[], limit: number): Promise<RoomEntity[]>
    {
        if(!search) return null;

        const builder = Application.instance.core.database.entityManager.createQueryBuilder(RoomEntity, 'room');
        
        builder
            .select(['room.id', 'room.name', 'room.description', 'room.ownerId', 'room.ownerName', 'room.state', 'room.categoryId', 'room.allowPets', 'room.usersNow', 'room.usersMax', 'room.tradeType'])
            .where('room.name LIKE :name', { name: search + '%' });

        if(categoryIds && categoryIds.length) builder.andWhere('room.categoryId IN (:categoryIds)', { categoryIds });
        
        builder
            .orderBy('room.usersNow', 'DESC')
            .take(limit)
            .loadRelationCountAndMap('room.totalLikes', 'room.userLikes');
        
        const results = await builder.getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async findRoomsByAnything(search: string, categoryIds: number[], limit: number): Promise<RoomEntity[]>
    {
        if(!search) return null;

        const builder = Application.instance.core.database.entityManager.createQueryBuilder(RoomEntity, 'room');
        
        builder
            .select(['room.id', 'room.name', 'room.description', 'room.ownerId', 'room.ownerName', 'room.state', 'room.categoryId', 'room.allowPets', 'room.usersNow', 'room.usersMax', 'room.tradeType'])
            .where('room.name LIKE :name', { name: search + '%' })
            .orWhere('room.ownerName LIKE :ownerName', { ownerName: search + '%' });

        if(categoryIds && categoryIds.length) builder.andWhere('room.categoryId IN (:categoryIds)', { categoryIds });
        
        builder
            .orderBy('room.usersNow', 'DESC')
            .take(limit)
            .loadRelationCountAndMap('room.totalLikes', 'room.userLikes');
        
        const results = await builder.getMany();

        if(!results || !results.length) return null;

        return results;
    }
}