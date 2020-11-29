import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class RoomDisposeCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'room_dispose')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        if(!room.security.isOwner(user)) return;

        room.dispose();
    }
}