import { IUser } from '../../user';

export interface ICommand
{
    process(user: IUser, ...args: any[]): Promise<void>;
    permission: string;
    aliases: string[];
}