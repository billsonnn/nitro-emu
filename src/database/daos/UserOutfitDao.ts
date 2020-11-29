import { Application } from '../../app';
import { UserGender } from '../../core';
import { UserOutfitEntity } from '../entities/UserOutfitEntity';

export class UserOutfitDao
{
    public static async loadUserOutfits(userId: number): Promise<UserOutfitEntity[]>
    {
        if(!userId) return null;
        
        const results = await Application.instance.core.database.entityManager.find(UserOutfitEntity, { where: { userId } });

        if(!results || !results.length) return null;

        return results;
    }

    public static async addOutfit(userId: number, figure: string, gender: string, slotNumber: number): Promise<UserOutfitEntity>
    {
        if(!userId || !figure || !gender || (slotNumber <= 0 || slotNumber > 6)) return;

        const entity = new UserOutfitEntity();

        entity.userId     = userId;
        entity.figure     = figure;
        entity.gender     = gender === UserGender.MALE ? UserGender.MALE : UserGender.FEMALE;
        entity.slotNumber = slotNumber;

        await this.removeOutfit(userId, slotNumber);

        await Application.instance.core.database.entityManager.save(entity);
        
        return entity;
    }

    public static async removeOutfit(userId: number, slotNumber: number): Promise<void>
    {
        if(!userId || !slotNumber) return;

        await Application.instance.core.database.entityManager.delete(UserOutfitEntity, { userId, slotNumber });
    }
}