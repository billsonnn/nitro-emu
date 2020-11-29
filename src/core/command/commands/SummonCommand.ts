import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class SummonCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.SUMMON_USER, 'summon')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        const username = args[0] || '';

        if(!username || username === '') return;

        const activeUser = room.manager.core.user.getUserByUsername(username);

        if(!activeUser || activeUser === user || (activeUser.roomUnit && activeUser.roomUnit.manager === room.unit)) return;

        room.manager.forceEnterRoom(activeUser, room.id);
    }
}