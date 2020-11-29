import { IMessageComposer } from '../../../../../networking';

export class RoomUnitIdleComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, flag: boolean)
    {
        this._data = [ unitId, flag ];
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