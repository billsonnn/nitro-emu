import { INitroManager } from '../../common';
import { INitroInstance } from '../../core';
import { ICodec } from '../codec';
import { IConnection } from '../connections';
import { IMessageConfiguration, IMessageHandler, MessageClassManager } from '../messages';
import { IServerConfiguration } from './IServerConfiguration';

export interface IServer extends INitroManager
{
    listen(): void;
    addConnection(connection: IConnection): IConnection;
    removeConnection(connection: IConnection): void;
    removeAllConnections(): void;
    registerMessages(configuration: IMessageConfiguration): void;
    registerHandler(handler: IMessageHandler): void;
    removeHandler(handler: IMessageHandler): void;
    removeAllHandlers(): void;
    id: number;
    configuration: IServerConfiguration;
    instance: INitroInstance;
    connections: Map<string, Map<number, IConnection>>;
    messages: MessageClassManager;
    codec: ICodec;
}