import { IMessageComposer } from '../../../../networking';

export class CameraPriceComposer implements IMessageComposer
{
    private _data: any [];

    constructor()
    {
        this._data = [ 0, 0, 0 ];
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