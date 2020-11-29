import { IMessageComposer } from '../../../../../../networking';

export class UserBotRemoveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(botId: number)
    {
        this._data = [ botId ];
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