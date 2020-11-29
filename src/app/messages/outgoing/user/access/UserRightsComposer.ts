import { IMessageComposer } from '../../../../../networking';

export class UserRightsComposer implements IMessageComposer
{
    private _data: any [];

    constructor()
    {
        this._data = [ true, true, true ];
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