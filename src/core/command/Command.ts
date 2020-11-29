import { IUser } from '../user';
import { ICommand } from './interfaces';

export abstract class Command implements ICommand
{
    private _permission: string;
    private _aliases: string[];

    constructor(permission: string, ...aliases: string[])
    {
        this._permission    = permission;
        this._aliases       = [ ...aliases ];
    }

    public async process(user: IUser, ...args: any[]): Promise<void>
    {
        await this.onProcess(user, ...args);
    }

    protected abstract async onProcess(user: IUser, ...args: any[]): Promise<void>;

    public get permission(): string
    {
        return this._permission;
    }

    public get aliases(): string[]
    {
        return this._aliases;
    }
}