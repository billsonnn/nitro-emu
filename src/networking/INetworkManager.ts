import { INitroManager } from '../common';
import { INitroInstance } from '../core';
import { IServer } from './servers';

export interface INetworkManager extends INitroManager
{
    addServer(server: IServer): IServer;
    removeServer(server: IServer): void;
    removeAllServers(): void;
    instance: INitroInstance;
    servers: Map<number, IServer>;
}