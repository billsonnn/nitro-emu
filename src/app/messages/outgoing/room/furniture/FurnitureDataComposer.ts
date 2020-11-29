import { IMessageComposer } from '../../../../../networking';

export class FurnitureDataComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, ...data: any[])
    {
        this._data = [ itemId.toString(), ...data ];
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