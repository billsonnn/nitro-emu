import { Bot, IRoomUnitController, User } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class RoomUnitInfoComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unit: IRoomUnitController)
    {
        this._data = [];

        const holder = unit && unit.holder;

        if(holder instanceof User)
        {
            this._data = [ unit.id, holder.figure, holder.gender, holder.motto, holder.details.achievementScore ];
        }

        else if(holder instanceof Bot)
        {
            this._data = [ unit.id, holder.figure, holder.gender, holder.motto, 0 ];
        }
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}