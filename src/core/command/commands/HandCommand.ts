import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class HandCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'hand')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.hand(parseInt(args[0]));
    }
}