import { INitroManager } from '../../../common';
import { INitroCore } from '../../interfaces';
import { IUser } from '../../user';
import { ICommand } from './ICommand';

export interface ICommandManager extends INitroManager
{
    getCommand(alias: string): ICommand;
    registerCommand(command: ICommand): ICommand;
    processMessageAsCommand(user: IUser, message: string): Promise<boolean>;
    core: INitroCore;
    commands: ICommand[];
}