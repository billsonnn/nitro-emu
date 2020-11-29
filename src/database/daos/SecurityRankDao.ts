import { Application } from '../../app';
import { SecurityRankEntity } from '../entities';

export class SecurityRankDao
{
    public static async loadRanks(): Promise<SecurityRankEntity[]>
    {
        const results = await Application.instance.core.database.entityManager.find(SecurityRankEntity);

        if(!results || !results.length) return null;

        return results;
    }
}