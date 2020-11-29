import { IMessageComposer } from '../../../../../networking';

export class RoomScoreComposer implements IMessageComposer
{
    private _data: any[];

    constructor(totalLikes: number, canLike: boolean)
    {
        this._data = [ totalLikes, canLike ];
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