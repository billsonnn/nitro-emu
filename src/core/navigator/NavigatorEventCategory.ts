import { NavigatorEventCategoryEntity } from '../../database';

export class NavigatorEventCategory
{
    private _entity: NavigatorEventCategoryEntity;

    constructor(entity: NavigatorEventCategoryEntity)
    {
        if(!(entity instanceof NavigatorEventCategoryEntity)) throw new Error('invalid_entity');

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

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }
}