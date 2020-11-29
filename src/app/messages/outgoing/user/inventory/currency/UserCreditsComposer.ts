import { IMessageComposer } from '../../../../../../networking';

export class UserCreditsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(credits: number)
    {
        this._data = [ (credits || 0).toString() ];
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