import { IMessageComposer } from '../../../../../networking';

export class UserFigureComposer implements IMessageComposer
{
    private _data: any [];

    constructor(figure: string, gender: string)
    {
        this._data = [ figure, gender ];
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