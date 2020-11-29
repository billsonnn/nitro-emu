import { IRoomUnitChat } from '../../../../../room';
import { IUser } from '../../../../../user';
import { FurnitureWiredTriggerData, FurnitureWiredTriggerSaysSomethingData } from '../data';
import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerSaysSomethingLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(user: IUser, chat: IRoomUnitChat): boolean
    {
        if(!user || !chat || !super.canTrigger(user, chat)) return false;

        const message = this.wiredData.stringParameter.toLocaleLowerCase();

        if(message === '') return false;

        if(this.wiredData.userId)
        {
            if(this.wiredData.userId !== user.id) return false;
        }

        if(chat.message.toLocaleLowerCase().indexOf(message) === -1) return false;
        
        return true;
    }

    public get requiresUser(): boolean
    {
        return true;
    }

    public createWiredData(): FurnitureWiredTriggerData
    {
        return new FurnitureWiredTriggerSaysSomethingData();
    }

    public get wiredData(): FurnitureWiredTriggerSaysSomethingData
    {
        return this._wiredData as FurnitureWiredTriggerSaysSomethingData;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.AVATAR_SAYS_SOMETHING;
    }
}