import { IMessageComposer } from '../../../../networking';

export class DesktopViewComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ ];
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