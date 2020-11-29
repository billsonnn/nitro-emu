import { RoomUnitStatusEnum } from '../../room';
import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class LayCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'lay')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const isLaying = unit.location.hasStatus(RoomUnitStatusEnum.LAY);

        unit.location.lay(!isLaying);
    }
}