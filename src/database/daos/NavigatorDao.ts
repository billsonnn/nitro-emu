import { Application } from '../../app';
import { NavigatorCategoryEntity, NavigatorTabEntity } from '../entities';

export class NavigatorDao
{
    public static async loadTabs(): Promise<NavigatorTabEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(NavigatorTabEntity);

        if(!results || !results.length) return null;

        return results;
    }

    public static async loadCategories(): Promise<NavigatorCategoryEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(NavigatorCategoryEntity);

        if(!results || !results.length) return null;

        return results;
    }
}