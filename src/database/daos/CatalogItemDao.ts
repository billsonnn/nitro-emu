import { Application } from '../../app';
import { CatalogItemEntity } from '../entities';

export class CatalogItemDao
{
    public static async loadAllItems(): Promise<CatalogItemEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(CatalogItemEntity, {
            order: { productName: 'ASC' }
        });

        if(!results || !results.length) return null;

        return results;
    }
}