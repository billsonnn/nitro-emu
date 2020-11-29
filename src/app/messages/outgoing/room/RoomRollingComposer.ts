import { IRoomUnitController, RoomRollerData } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class RoomRollingComposer implements IMessageComposer
{
    private _data: any[];

    constructor(rollerData: RoomRollerData, ignoreFurni: boolean = false, unitData: { unit: IRoomUnitController, height: number, nextHeight: number} = null)
    {
        this._data = [
            rollerData.position.x,
            rollerData.position.y,
            rollerData.positionNext.x,
            rollerData.positionNext.y
        ];

        let totalFurniture = 0;

        const furnitureData: any[] = [];

        if(!ignoreFurni && (rollerData.furniture && rollerData.furniture.size))
        {
            for(let { furniture, height, nextHeight } of rollerData.furniture.values())
            {
                if(!furniture) continue;

                furnitureData.push(furniture.id, height.toFixed(3), nextHeight.toFixed(3));

                totalFurniture++;
            }
        }

        this._data.push(totalFurniture, ...furnitureData, (rollerData.roller ? rollerData.roller.id : 0));

        if(unitData) this._data.push(2, unitData.unit.id, unitData.height.toFixed(3), unitData.nextHeight.toFixed(3));
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