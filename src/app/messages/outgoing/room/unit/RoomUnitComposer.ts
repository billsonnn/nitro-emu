import { Bot, IRoomUnitController, RentableBot, User } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class RoomUnitComposer implements IMessageComposer
{
    private _data: any[];

    constructor(units: IterableIterator<IRoomUnitController> | IRoomUnitController[])
    {
        let totalUnits = 0;

        const data: any[] = [];

        if(units)
        {
            for(let unit of units)
            {
                if(!unit || !unit.holder) continue;

                data.push(
                    unit.holder.id,
                    unit.holder.username,
                    unit.holder.motto,
                    unit.holder.figure,
                    unit.id,
                    unit.location.position.x,
                    unit.location.position.y,
                    unit.location.position.z.toFixed(3),
                    unit.location.position.rotation,
                    unit.type
                );

                if(unit.holder instanceof User)
                {
                    data.push(
                        unit.holder.details.gender.toUpperCase(),
                        -1, // favorite group id
                        -1, // favorite group id
                        null, // favorite group name
                        null,
                        unit.holder.details.achievementScore,
                        true
                    );
                }

                else if(unit.holder instanceof RentableBot)
                {
                    data.push(
                        unit.holder.details.gender.toUpperCase(),
                        unit.holder.details.userId,
                        unit.holder.details.ownerName,
                        0
                    );
                }

                else if(unit.holder instanceof Bot)
                {
                    //
                }

                totalUnits++;
            }
        }

        this._data = [ totalUnits, ...data ];
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