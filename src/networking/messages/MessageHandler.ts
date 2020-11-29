import { NitroManager } from '../../common';
import { INitroInstance } from '../../core';
import { IServer } from '../servers';
import { IMessageEvent } from './IMessageEvent';
import { IMessageHandler } from './IMessageHandler';

export class MessageHandler extends NitroManager implements IMessageHandler
{
    private _instance: INitroInstance;
    private _server: IServer;
    private _messageEvents: IMessageEvent[];

    constructor(instance: INitroInstance)
    {
        super();

        this._instance      = instance;
        this._server        = null;
        this._messageEvents = [];
    }

    protected onDispose(): void
    {
        this.removeAllEvents();
    }
    
    public registerEvent(event: IMessageEvent): void
    {
        this._messageEvents.push(event);

        this._server.messages.registerMessageEvent(event);
    }

    public removeAllEvents(): void
    {
        for(let event of this._messageEvents)
        {
            if(!event) continue;

            this._server.messages.removeMessageEvent(event);
        }
    }

    public get instance(): INitroInstance
    {
        return this._instance;
    }

    public get server(): IServer
    {
        return this._server;
    }

    public set server(server: IServer)
    {
        this._server = server;
    }
}