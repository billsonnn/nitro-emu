import { IMessageComposer } from '../../../../../../networking';

export class UserFurnitureRemoveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(id: number)
    {
        this._data = [ id ];
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