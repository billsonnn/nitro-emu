import { NitroManager, Position } from '../../../common';
import { BotDao } from '../../../database';
import { Bot, IBot } from '../../bot';
import { IUser } from '../../user';
import { IRoom } from '../interfaces';

export class RoomBotManager extends NitroManager
{
    private _room: IRoom;

    private _bots: Map<number, IBot>;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room  = room;

        this._bots  = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadBots();
    }

    protected async onDispose(): Promise<void>
    {
        await this.removeAllBots();
    }

    public getBot(id: number): IBot
    {
        const existing = this._bots.get(id);

        if(!existing) return null;

        return existing;
    }

    public placeBot(user: IUser, bot: IBot, position: Position): void
    {
        bot = this.addBot(bot, position);

        if(!bot) return;
    }

    public addBot(bot: IBot, position: Position): IBot
    {
        if(!bot) return null;

        const existing = this._bots.get(bot.id);

        if(existing) return existing;

        const unit = this._room.unit.createUnitAndAssign(bot, position);

        if(!unit) return null;

        if(!bot.setRoom(this._room))
        {
            bot.clearRoomUnit();

            return null;
        }

        this._bots.set(bot.id, bot);

        return bot;
    }

    public async removeBot(id: number): Promise<void>
    {
        const bot = this.getBot(id);

        if(!bot) return;

        this._bots.delete(bot.id);

        await bot.dispose();
    }

    public async removeAllBots(): Promise<void>
    {
        if(this._bots && this._bots.size)
        {
            for(let bot of this._bots.values())
            {
                if(!bot) continue;

                this._bots.delete(bot.id);

                await bot.dispose();
            }
        }
    }

    private async loadBots(): Promise<void>
    {
        await this.removeAllBots();

        const results = await BotDao.loadRoomBots(this._room.id);

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                try
                {
                    const bot = new Bot(result);

                    if(!bot) continue;

                    const position = new Position(bot.details.x, bot.details.y, 0, bot.details.direction);
                    
                    this.addBot(bot, position);
                }

                catch(err)
                {
                    this.logger.error(err.message || err, err.stack);
                }
            }
        }
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get bots(): Map<number, IBot>
    {
        return this._bots;
    }
}