import { IMessageComposer } from '../../../../../networking';

export class RoomModelNameComposer implements IMessageComposer
{
    private _data: any[];

    constructor(modelName: string, roomId: number)
    {
        this._data = [ modelName, roomId ];
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