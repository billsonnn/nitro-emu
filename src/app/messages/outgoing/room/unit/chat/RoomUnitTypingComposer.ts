import { IMessageComposer } from '../../../../../../networking';

export class RoomUnitTypingComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, flag: boolean)
    {
        this._data = [ unitId, (flag ? 1 : 0) ];
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