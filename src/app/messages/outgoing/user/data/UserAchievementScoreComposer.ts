import { IMessageComposer } from '../../../../../networking';

export class UserAchievementScoreComposer implements IMessageComposer
{
    private _data: any [];

    constructor(score: number)
    {
        this._data = [ score ];
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