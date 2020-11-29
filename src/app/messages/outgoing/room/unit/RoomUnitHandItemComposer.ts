import { IMessageComposer } from '../../../../../networking';

export class RoomUnitHandItemComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, handType: number)
    {
        this._data = [ unitId, handType ];
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