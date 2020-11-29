import { IMessageComposer } from '../../../../../networking';

export class RoomUnitRemoveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number)
    {
        this._data = [ unitId.toString() ];
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