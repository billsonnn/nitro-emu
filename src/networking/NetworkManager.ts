import { NitroManager } from '../common';
import { INitroInstance } from '../core';
import { INetworkManager } from './INetworkManager';
import { IServer } from './servers';

export class NetworkManager extends NitroManager implements INetworkManager
{
    private _instance: INitroInstance;
    private _servers: Map<number, IServer>;

    constructor(instance: INitroInstance)
    {
        super();

        if(!instance) throw new Error('invalid_instance');

        this._instance  = instance;
        this._servers   = new Map();
    }

    protected onDispose(): void
    {
        this.removeAllServers();
    }

    public addServer(server: IServer): IServer
    {
        for(let existing of this._servers.values())
        {
            if(!existing) continue;

            if(existing !== server) continue;

            return server;
        }

        server.instance = this._instance;

        this._servers.set(server.id, server);

        return server;
    }

    public removeServer(server: IServer): void
    {
        if(!server) return;

        const existing = this._servers.get(server.id);

        if(!existing) return;

        this._servers.delete(server.id);

        server.dispose();
    }

    public removeAllServers(): void
    {
        for(let server of this._servers.values())
        {
            if(!server) continue;

            this._servers.delete(server.id);

            server.dispose();
        }
    }

    public get instance(): INitroInstance
    {
        return this._instance;
    }

    public get servers(): Map<number, IServer>
    {
        return this._servers;
    }
}