import { RoomUnitStatusEnum } from '../../room';
import { PermissionList } from '../../security/permission';
import { IUser } from '../../user';
import { Command } from '../Command';
import { ICommand } from '../interfaces';

export class SitCommand extends Command implements ICommand
{
    constructor()
    {
        super(PermissionList.NONE, 'sit')
    }

    protected async onProcess(user: IUser, ...args: any[]): Promise<void>
    {
        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const isSitting = unit.location.hasStatus(RoomUnitStatusEnum.SIT);

        unit.location.sit(!isSitting);
    }
}