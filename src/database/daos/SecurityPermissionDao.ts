import { Application } from '../../app';
import { SecurityPermissionEntity } from '../entities';

export class SecurityPermissionDao
{
    public static async loadPermissions(): Promise<SecurityPermissionEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(SecurityPermissionEntity);

        if(!results || !results.length) return null;

        return results;
    }
}