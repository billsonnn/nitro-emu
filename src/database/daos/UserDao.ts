import { Like } from 'typeorm';
import { Application } from '../../app';
import { UserEntity } from '../entities';

export class UserDao
{
    public static async getIdByUsername(username: string): Promise<number>
    {
        if(!username) return null;
        
        const result = await Application.instance.core.database.entityManager.findOne(UserEntity, { select: ['id', 'username'], where: { username } });

        if(!result) return null;

        return result.id;
    }

    public static async getUserById(id: number): Promise<UserEntity>
    {
        if(!id) return null;

        const result = await Application.instance.core.database.entityManager
            .createQueryBuilder(UserEntity, 'user')
            .select(['user', 'info', 'statistics'])
            .where('user.id = :id', { id })
            .innerJoin('user.info', 'info')
            .innerJoin('user.statistics', 'statistics')
            .loadRelationCountAndMap('user.totalFriends', 'user.messengerFriends')
            .getOne();

        if(!result) return null;

        return result;
    }

    public static async getUserByUsername(username: string): Promise<UserEntity>
    {
        if(!username) return null;

        const result = await Application.instance.core.database.entityManager
            .createQueryBuilder(UserEntity, 'user')
            .select(['user', 'info', 'statistics'])
            .where('user.username = :username', { username })
            .innerJoin('user.info', 'info')
            .innerJoin('user.statistics', 'statistics')
            .loadRelationCountAndMap('user.totalFriends', 'user.messengerFriends')
            .orderBy('user.totalFriends', 'DESC')
            .getOne();

        if(!result) return null;

        return result;
    }

    public static async searchUsersByUsername(username: string, take: number = 20): Promise<UserEntity[]>
    {
        if(!username) return null;

        const results = await Application.instance.core.database.entityManager.find(UserEntity, { select: ['id', 'username', 'motto', 'figure', 'online'], where: { username: Like(username + '%') }, take });

        if(!results || !results.length) return null;

        return results;
    }
}