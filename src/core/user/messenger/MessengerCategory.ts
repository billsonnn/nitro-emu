import { MessengerCategoryEntity } from '../../../database';

export class MessengerCategory
{
    private _entity: MessengerCategoryEntity;

    constructor(entity: MessengerCategoryEntity)
    {
        if(!(entity instanceof MessengerCategoryEntity)) throw new Error('invalid_entity');
        
        this._entity = entity;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get name(): string
    {
        return this._entity.name;
    }
}