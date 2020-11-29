import { IMessageComposer } from '../../../../../networking';

export class UserFirstLoginOfDayComposer implements IMessageComposer
{
    private _data: any [];

    constructor(flag: boolean)
    {
        this._data = [ flag || false ];
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