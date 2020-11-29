import { INitroManager } from '../../common';
import { IUser } from '../../core';
import { IConnectionHolder } from './IConnectionHolder';

export interface IConnection extends IConnectionHolder, INitroManager
{
    setUser(user: IUser): boolean;
    write(buffer: Buffer): void;
    receivePong(): void;
    id: number;
    ip: string;
    user: IUser;
}