import { IMessageComposer } from '../../../../networking';

export class NavigatorLiftedRoomsComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        let totalLifted = 0;

        const data: any[] = [];

        this._data = [ totalLifted, ...data ];
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