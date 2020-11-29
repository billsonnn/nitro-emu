import { IMessageComposer } from '../../../../../networking';

export class RoomUnitActionComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, actionType: number)
    {
        this._data = [ unitId, actionType ];
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