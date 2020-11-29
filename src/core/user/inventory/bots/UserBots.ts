import { UserBotAddComposer, UserBotRemoveComposer } from '../../../../app';
import { NitroManager } from '../../../../common';
import { BotDao } from '../../../../database';
import { Bot, IBot } from '../../../bot';
import { IUser } from '../../interfaces';

export class UserBots extends NitroManager
{
    private _user: IUser;

    private _bots: Map<number, IBot>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user  = user;

        this._bots  = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadBots();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;

        this._bots.clear();
    }

    public getBot(id: number): IBot
    {
        const existing = this._bots.get(id);

        if(!existing) return null;

        return existing;
    }

    public addBot(...bots: IBot[]): void
    {
        bots = [ ...bots ];

        for(let bot of bots)
        {
            if(!bot) continue;

            const existing = this.getBot(bot.id);

            if(existing) continue;

            bot.clearRoom();

            if(!bot.details.setOwner(this._user)) continue;

            this._bots.set(bot.id, bot);

            bots.push(bot);

            this._user.processComposer(new UserBotAddComposer(bot));
        }
    }

    public removeBot(...bots: IBot[]): void
    {
        bots = [ ...bots ];

        for(let bot of bots)
        {
            if(!bot) continue;

            const existing = this.getBot(bot.id);

            if(existing !== bot) continue;

            this._bots.delete(bot.id);

            this._user.processComposer(new UserBotRemoveComposer(bot.id));
        }
    }

    private async loadBots(): Promise<void>
    {
        this._bots.clear();

        const results = await BotDao.loadUserBots(this._user.id);

        if(!results || !results.length) return;

        for(let result of results)
        {
            if(!result) continue;

            try
            {
                const bot = new Bot(result);

                if(!bot || !bot.details.setOwner(this._user)) continue;

                this._bots.set(bot.id, bot);
            }

            catch(err)
            {
                this.logger.error(err.message || err, err.stack);
            }
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get bots(): Map<number, IBot>
    {
        return this._bots;
    }
}