import { Application } from '../../app';
import { RoomModelEntity } from '../entities';

export class RoomModelDao
{
    public static async loadModels(): Promise<RoomModelEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(RoomModelEntity, { where: { enabled: '1', custom: '0' } });

        if(!results || !results.length) return null;

        return results;
    }
}