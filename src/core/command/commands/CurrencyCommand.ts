import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class CurrencyCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'currency')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        const username  = args[0] || '';
        const type      = parseInt(args[1]);
        const amount    = parseInt(args[2]);

        if(!username) return;

        const activeUser = room.manager.core.user.getUserByUsername(username);

        if(!activeUser) return;

        const currencyInventory = activeUser.inventory && activeUser.inventory.currency;

        if(!currencyInventory) return;

        currencyInventory.modifyCurrency(type, amount);
    }
}