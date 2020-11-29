import { IMessageComposer } from '../../../../../networking';

export class RoomUnitEffectComposer implements IMessageComposer
{
    private _data: any[];

    constructor(unitId: number, effectType: number)
    {
        this._data = [ unitId, effectType, 0 ];
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