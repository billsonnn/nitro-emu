import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class RespawnCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'respawn')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        let unit = user.roomUnit;

        if(!unit) return;

        const position = unit.location.position.copy();

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        room.unit.enterRoom(user, position);
    }
}