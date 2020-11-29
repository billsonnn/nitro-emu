import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class SetPaintCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'setPaint')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const room = unit.manager && unit.manager.room;

        if(!room) return;

        if(!room.security.isOwner(user)) return;

        const type  = args[0] || '';
        const value = args[1] || '';

        if(type === '' || value === '') return;

        switch(type)
        {
            case 'floor':
                room.details.setFloorType(value);
                return;
            case 'wall':
                room.details.setWallType(value);
                return;
            case 'landscape':
                room.details.setLandscapeType(value);
                return;
        }
    }
}