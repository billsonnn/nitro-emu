import { Application } from '../../app';
import { UserCurrencyEntity } from '../entities';

export class UserCurrencyDao
{
    public static async createCurrency(userId: number, type: number, amount: number = 0): Promise<UserCurrencyEntity>
    {
        if(!userId || typeof type !== 'number' || typeof amount !== 'number') return null;
        
        const entity = new UserCurrencyEntity();

        entity.userId  = userId;
        entity.type    = type;
        entity.amount  = amount;

        await Application.instance.core.database.entityManager.save(entity);
        
        return entity;
    }

    public static async updateCurrency(userId: number, type: number, amount: number): Promise<void>
    {
        if(!userId || typeof type !== 'number' || typeof amount !== 'number') return null;
        
        await Application.instance.core.database.entityManager.update(UserCurrencyEntity, { userId, type }, { amount });
    }

    public static async loadCurrencies(userId: number): Promise<UserCurrencyEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager.find(UserCurrencyEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }
}