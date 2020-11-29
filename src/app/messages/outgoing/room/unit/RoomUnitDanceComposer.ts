import { IMessageComposer } from '../../../../../networking';

export class RoomUnitDanceComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, danceType: number)
    {
        this._data = [ unitId, danceType ];
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