import { NitroManager } from '../../common';
import { INitroCore } from '../interfaces';
import { IUser } from '../user';
import { AboutCommand, CurrencyCommand, EffectCommand, FigureCommand, HandCommand, LayCommand, RespawnCommand, RoomDisposeCommand, SetPaintCommand, SitCommand, SummonCommand, ToggleWiredCommand } from './commands';
import { ICommand } from './interfaces';
import { ICommandManager } from './interfaces/ICommandManager';

export class CommandManager extends NitroManager implements ICommandManager
{
    private _core: INitroCore;

    private _commands: ICommand[];

    constructor(core: INitroCore)
    {
        super();

        this._core      = core;

        this._commands  = [];
    }

    protected onInit(): void
    {
        this.loadCommands();
    }

    protected onDispose(): void
    {
        this._commands = [];
    }

    public getCommand(alias: string): ICommand
    {
        if(!this._commands.length) return null;

        for(let command of this._commands)
        {
            if(!command) continue;

            if(command.aliases.indexOf(alias) === -1) continue;

            return command;
        }

        return null;
    }

    public registerCommand(command: ICommand): ICommand
    {
        if(!command) return null;

        for(let alias of command.aliases)
        {
            if(!alias) continue;

            if(this.getCommand(alias)) return null;
        }

        this._commands.push(command);

        return command;
    }

    public async processMessageAsCommand(user: IUser, message: string): Promise<boolean>
    {
        if(!user || !message) return false;

        if(message.charAt(0) !== ':') return false;
        
        const parts = message.substr(1).split(' ');

        if(!parts.length) return false;
        
        const command = this.getCommand(parts[0]);

        if(!command) return false;

        if(command.permission && !user.hasPermission(command.permission)) return false;
        
        parts.splice(0, 1);

        await command.process(user, ...parts);

        return true;
    }

    private async loadCommands(): Promise<void>
    {
        this.registerCommand(new AboutCommand());
        this.registerCommand(new CurrencyCommand());
        this.registerCommand(new EffectCommand());
        this.registerCommand(new FigureCommand());
        this.registerCommand(new HandCommand());
        this.registerCommand(new LayCommand());
        this.registerCommand(new RespawnCommand());
        this.registerCommand(new RoomDisposeCommand());
        this.registerCommand(new SetPaintCommand());
        this.registerCommand(new SitCommand());
        this.registerCommand(new SummonCommand());
        this.registerCommand(new ToggleWiredCommand());

        this.logger.log(`Loaded ${ this._commands.length } commands`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get commands(): ICommand[]
    {
        return this._commands;
    }
}