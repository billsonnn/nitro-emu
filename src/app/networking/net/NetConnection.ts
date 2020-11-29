import * as net from 'net';
import { Connection, IConnection, IServer } from '../../../networking';

export class NetConnection extends Connection implements IConnection
{
    private _socket: net.Socket;

    constructor(socket: net.Socket, server: IServer, ip: string)
    {
        super(server, ip);

        this._socket = socket;
    }

    protected close(): void
    {
        if(this._socket) this._socket.end();
    }

    public write(buffer: Buffer): void
    {
        if(this._socket.destroyed) return;

        this._socket.write(buffer);
    }
}