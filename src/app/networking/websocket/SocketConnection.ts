import * as ws from 'ws';
import { Connection, IConnection, IServer } from '../../../networking';

export class SocketConnection extends Connection implements IConnection
{
    private _socket: ws;

    constructor(socket: ws, server: IServer, ip: string)
    {
        super(server, ip);

        this._socket = socket;
    }

    protected close(): void
    {
        if(this._socket) this._socket.close();
    }

    public write(buffer: Buffer): void
    {
        if(this._socket.readyState === ws.CLOSED) return;

        this._socket.send(buffer);
    }
}