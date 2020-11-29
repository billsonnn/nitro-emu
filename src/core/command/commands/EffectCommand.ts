import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class EffectCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'effect')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.effect(parseInt(args[0]));
    }
}