import { IBot } from '../../../../../../core';

export class UserBotComposerUtilities
{
    public static composeBot(bot: IBot): any[]
    {
        return [ bot.id, bot.username, bot.motto, bot.gender.toLocaleLowerCase(), bot.figure ];
    }
}