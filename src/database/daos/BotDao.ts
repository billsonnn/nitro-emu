import { Application } from '../../app';
import { BotEntity } from '../entities';

export class BotDao
{
    public static async loadRoomBots(roomId: number): Promise<BotEntity[]>
    {
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(BotEntity, 'bot')
            .select(['bot', 'user.id', 'user.username'])
            .where('bot.roomId = :roomId', { roomId })
            .innerJoin('bot.user', 'user')
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadUserBots(userId: number): Promise<BotEntity[]>
    {
        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(BotEntity, 'bot')
            .select(['bot'])
            .where('bot.roomId IS NULL')
            .andWhere('bot.userId = :userId', { userId })
            .getMany();

        if(!results || !results.length) return null;

        return results;
    }
}