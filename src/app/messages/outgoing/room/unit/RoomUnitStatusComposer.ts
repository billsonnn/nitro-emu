import { IRoomUnitController, RoomUnitStatusEnum } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class RoomUnitStatusComposer implements IMessageComposer
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
                if(!unit) continue;

                const position = (unit.location && unit.location.position) || null;

                if(!position) continue;

                let actions: string = '/';

                const statuses = unit.location.statuses;

                for(let [ type, value ] of statuses.entries())
                {
                    if(!type) continue;

                    if(type === RoomUnitStatusEnum.SIGN) statuses.delete(type);

                    actions += `${ type } ${ value }/`;
                }

                data.push(
                    unit.id,
                    position.x,
                    position.y,
                    position.z.toFixed(3),
                    position.headRotation,
                    position.rotation,
                    actions
                );

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