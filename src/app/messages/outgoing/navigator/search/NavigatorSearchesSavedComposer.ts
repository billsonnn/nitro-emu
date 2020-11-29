import { IMessageComposer } from '../../../../../networking';

export class NavigatorSearchesSavedComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        let totalSearches = 0;

        const data: any[] = [];

        this._data = [ totalSearches, ...data ];
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