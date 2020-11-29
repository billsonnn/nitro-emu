import { IUser } from '../../../../../user';
import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerEnterRoomLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(user: IUser): boolean
    {
        if(!user || !super.canTrigger(user)) return false;

        const username = this.wiredData.stringParameter.toLocaleLowerCase();

        if(username !== '')
        {
            if(user.username.toLocaleLowerCase() !== username) return false;
        }

        return true;
    }

    public get requiresUser(): boolean
    {
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.AVATAR_ENTERS_ROOM;
    }
}