import { Application } from '../../app';
import { CatalogPageEntity } from '../entities';

export class CatalogPageDao
{
    public static async loadAllPages(): Promise<CatalogPageEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(CatalogPageEntity, {
            order: { name: 'ASC' }
        });

        if(!results || !results.length) return null;

        return results;
    }
}