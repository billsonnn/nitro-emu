import { Application } from '../../app';
import { SecurityTicketEntity } from '../entities';

export class SecurityTicketDao
{
    public static async getTicket(ticket: string): Promise<SecurityTicketEntity>
    {
        if(!ticket) return null;

        const result = await Application.instance.core.database.entityManager.findOne(SecurityTicketEntity, { where: { ticket } });

        if(!result) return null;

        return result;
    }

    public static async removeTicket(ticket: string): Promise<void>
    {
        if(!ticket) return null;

        await Application.instance.core.database.entityManager.delete(SecurityTicketEntity, { ticket });
    }
}