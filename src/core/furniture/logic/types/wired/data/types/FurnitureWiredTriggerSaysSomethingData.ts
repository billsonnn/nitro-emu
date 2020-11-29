import { FurnitureWiredSaveTriggerEvent } from '../../../../../../../app';
import { FurnitureWiredTriggerData } from '../FurnitureWiredTriggerData';

export class FurnitureWiredTriggerSaysSomethingData extends FurnitureWiredTriggerData
{
    private static SETTER_ONLY_PARAMETER = 0;

    private _userId: number;

    constructor()
    {
        super();

        this._userId = 0;
    }

    public initializeFromFurnitureWiredData(data: any): boolean
    {
        if(!super.initializeFromFurnitureWiredData(data)) return false;

        let userId: number = (data && data.userId) || 0;

        if(userId === undefined) userId = 0;

        if(typeof userId !== 'number') userId = 0;

        this._userId = userId;

        return true;
    }

    public initializeFromIncomingMessage(message: FurnitureWiredSaveTriggerEvent): boolean
    {
        if(!(message instanceof FurnitureWiredSaveTriggerEvent)) return false;
        
        if(!super.initializeFromIncomingMessage(message)) return false;

        const setterOnly = ((this.intParameters[FurnitureWiredTriggerSaysSomethingData.SETTER_ONLY_PARAMETER]) || 0) === 1;

        if(setterOnly)
        {
            const user = message.connection && message.connection.user;

            if(user) this._userId = user.id;
            else
            {
                this.intParameters[FurnitureWiredTriggerSaysSomethingData.SETTER_ONLY_PARAMETER] = 0;
            }
        }

        return true;
    }

    public getAsObject(): any
    {
        return {
            userId: this._userId,
            ...super.getAsObject()
        };
    }

    public get userId(): number
    {
        return this._userId;
    }
}