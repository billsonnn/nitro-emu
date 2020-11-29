import { IBot } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { UserBotComposerUtilities } from './UserBotComposerUtilities';

export class UserBotAddComposer implements IMessageComposer
{
    private _data: any[];

    constructor(bot: IBot)
    {
        this._data = [ ...UserBotComposerUtilities.composeBot(bot), true ];
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