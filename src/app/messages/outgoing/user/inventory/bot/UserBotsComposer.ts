import { IBot } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { UserBotComposerUtilities } from './UserBotComposerUtilities';

export class UserBotsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(bots: IterableIterator<IBot> | IBot[])
    {
        let totalBots = 0;

        const botData: any[] = [];

        for(let bot of bots)
        {
            if(!bot) continue;

            botData.push(...UserBotComposerUtilities.composeBot(bot));

            totalBots++;
        }

        this._data = [ totalBots, ...botData ];
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