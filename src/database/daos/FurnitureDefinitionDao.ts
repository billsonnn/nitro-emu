import { Application } from '../../app';
import { FurnitureDefinitionEntity } from '../entities';

export class FurnitureDefinitionDao
{
    public static async loadItems(): Promise<FurnitureDefinitionEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(FurnitureDefinitionEntity);

        if(!results || !results.length) return null;

        return results;
    }
}