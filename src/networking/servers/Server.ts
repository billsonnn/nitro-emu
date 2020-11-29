import { NitroManager } from '../../common';
import { INitroInstance } from '../../core';
import { ICodec } from '../codec';
import { IConnection } from '../connections';
import { IMessageConfiguration, IMessageHandler, MessageClassManager } from '../messages';
import { IServer } from './IServer';
import { IServerConfiguration } from './IServerConfiguration';

export abstract class Server extends NitroManager implements IServer
{
    private static SERVER_COUNTER: number = 0;
    
    private _id: number;
    private _configuration: IServerConfiguration;
    private _instance: INitroInstance;

    private _connections: Map<string, Map<number, IConnection>>;
    private _messages: MessageClassManager;
    private _handlers: IMessageHandler[];
    
    protected _codec: ICodec;

    constructor(configuration: IServerConfiguration)
    {
        super();

        if(!configuration) throw new Error('invalid_configuration');

        this._id            = ++Server.SERVER_COUNTER;
        this._configuration = configuration;
        this._instance      = null;

        this._connections   = new Map();
        this._messages      = new MessageClassManager();
        this._handlers      = [];

        this._codec         = null;

        this.logger.description = this._id;
    }

    protected onDispose(): void
    {
        this.removeAllHandlers();
        
        if(this._messages) this._messages.dispose();
        
        this.removeAllConnections();

        this.close();

        this.logger.log(`Disposed`);
    }

    public abstract listen(): void;

    protected abstract close(): void;

    public addConnection(connection: IConnection): IConnection
    {
        if(!connection) return null;

        let existing = this._connections.get(connection.ip);

        if(existing === undefined)
        {
            this._connections.set(connection.ip, new Map());

            existing = this._connections.get(connection.ip);
        }

        existing.set(connection.id, connection);

        return connection;
    }

    public removeConnection(connection: IConnection): void
    {
        if(!connection) return;

        const existing = this._connections.get(connection.ip);

        if(!existing) return;
        
        existing.delete(connection.id);

        connection.dispose();
    }

    public removeAllConnections(): void
    {
        for(let [ ip, connections ] of this._connections.entries())
        {
            for(let value of connections.values())
            {
                connections.delete(value.id);

                value.dispose();
            }

            this._connections.delete(ip);
        }
    }

    public registerMessages(configuration: IMessageConfiguration): void
    {
        if(!configuration) return;

        this._messages.registerMessages(configuration);
    }

    public registerHandler(handler: IMessageHandler): void
    {
        if(!handler) return;

        if(this._handlers.indexOf(handler) >= 0) return;

        handler.server = this;

        this._handlers.push(handler);

        handler.init();
    }

    public removeHandler(handler: IMessageHandler): void
    {
        if(!handler) return;

        const index = this._handlers.indexOf(handler);

        if(index === -1) return;

        this._handlers.splice(index, 1);

        handler.dispose();
    }

    public removeAllHandlers(): void
    {
        for(let handler of this._handlers)
        {
            if(!handler) continue;

            handler.dispose();
        }

        this._handlers = [];
    }

    public get id(): number
    {
        return this._id;
    }

    public get configuration(): IServerConfiguration
    {
        return this._configuration;
    }

    public get instance(): INitroInstance
    {
        return this._instance;
    }

    public set instance(instance: INitroInstance)
    {
        this._instance = instance;
    }

    public get connections(): Map<string, Map<number, IConnection>>
    {
        return this._connections;
    }

    public get messages(): MessageClassManager
    {
        return this._messages;
    }

    public get codec(): ICodec
    {
        return this._codec;
    }
}