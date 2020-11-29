import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class ToggleWiredCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'toggle_wired')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        room.wired && room.wired.toggleWired(user);
    }
}