import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class FigureCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'figure')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        const username  = args[0] || '';
        const figure    = args[1] || '';
        const gender    = args[2] || '';

        if(!username || username === '' || !figure || figure === '') return;

        const activeUser = room.manager.core.user.getUserByUsername(username);

        if(!activeUser) return;

        activeUser.details.updateFigure(figure, gender);
    }
}