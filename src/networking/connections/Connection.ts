import { ClientPingComposer } from '../../app';
import { NitroManager, TimeHelper } from '../../common';
import { IUser } from '../../core';
import { IMessageComposer, IMessageDataWrapper, IMessageEvent } from '../messages';
import { IServer } from '../servers';
import { IConnection } from './IConnection';

export abstract class Connection extends NitroManager implements IConnection
{
    private static CONNECTION_COUNTER: number = 0;

    private _server: IServer;

    private _id: number;
    private _ip: string;

    private _pingLast: number;
    private _pingInterval: NodeJS.Timeout;
    private _pongReceived: boolean;

    private _user: IUser;

    constructor(server: IServer, ip: string)
    {
        super();

        this._server        = server;

        this._id            = ++Connection.CONNECTION_COUNTER;
        this._ip            = ip;

        this._pingLast      = 0;
        this._pingInterval  = null;
        this._pongReceived  = false;

        this._user          = null;

        this.logger.description = this._id;
    }

    protected onInit(): void
    {
        this.startPinging();

        this.logger.log(`Initialized`);
    }

    protected async onDispose(): Promise<void>
    {
        this.stopPinging();

        if(this._user) await this._user.dispose();

        this.close();

        this.logger.log(`Disposed`);
    }

    public setUser(user: IUser): boolean
    {
        if(this._user && (this._user !== user)) return false;

        this._user = user;

        return true;
    }

    public processWrapper(...wrappers: IMessageDataWrapper[]): void
    {
        if(!wrappers) return;
        
        wrappers = [ ...wrappers ];
        
        for(let wrapper of wrappers)
        {
            if(!wrapper) continue;

            const messages = this.getMessagesForWrapper(wrapper);

            if(!messages || !messages.length) continue;

            if(this._server.configuration.logging.messages.incoming) this.logger.log(`IncomingMessage: ${ messages[0].constructor.name } [${ wrapper.header }]`);

            this.handleMessages(...messages);
        }
    }

    public processComposer(...composers: IMessageComposer[]): void
    {
        if(!composers) return;
        
        composers = [ ...composers ];
        
        for(let composer of composers)
        {
            if(!composer) continue;

            const header = this._server.messages.getComposerId(composer);

            if(header === -1)
            {
                if(this._server.configuration.logging.messages.unknown) this.logger.warn(`Unknown Composer: ${ composer.constructor.name }`);

                continue;
            }

            const encoded = this._server.codec.encode(header, composer.getMessageArray());

            if(!encoded)
            {
                if(this._server.configuration.logging.messages.invalid) this.logger.error(`Encoding Failed: ${ composer.constructor.name }`);

                continue;
            }

            if(this._server.configuration.logging.messages.outgoing) this.logger.log(`OutgoingComposer: ${ composer.constructor.name } [${ header }]`);

            this.write(encoded.toBuffer());
        }
    }

    private getMessagesForWrapper(wrapper: IMessageDataWrapper): IMessageEvent[]
    {
        if(!wrapper) return null;

        const events = this._server.messages.getEvents(wrapper.header);

        if(!events || !events.length) return null;

        const parser = events[0].parser;

        if(!parser || !parser.flush() || !parser.parse(wrapper)) return null;

        return events;
    }

    private handleMessages(...messages: IMessageEvent[]): void
    {
        messages = [ ...messages ];

        for(let message of messages)
        {
            if(!message) continue;

            message.connection = this;

            if(message.callBack) message.callBack(message);
        }
    }

    private startPinging(): void
    {
        this.stopPinging();

        this._pingInterval = setInterval(() => this.requestPong(), 20000);
    }

    private stopPinging(): void
    {
        if(!this._pingInterval) return;

        clearInterval(this._pingInterval);

        this._pingInterval = null;
    }

    private requestPong(): void
    {
        if(this._pingLast && !this._pongReceived)
        {
            this.dispose();

            return;
        }

        this._pingLast      = TimeHelper.currentTimestamp;
        this._pongReceived  = false;

        this.processComposer(new ClientPingComposer());
    }

    public receivePong(): void
    {
        this._pongReceived = true;
    }

    public abstract write(buffer: Buffer): void;

    protected abstract close(): void;

    public get server(): IServer
    {
        return this._server;
    }

    public get id(): number
    {
        return this._id;
    }

    public get ip(): string
    {
        return this._ip;
    }

    public get user(): IUser
    {
        return this._user;
    }
}