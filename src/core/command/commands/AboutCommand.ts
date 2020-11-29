import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class AboutCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'about')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        console.log(user.roomUnit.location.position.toString())
    }
}