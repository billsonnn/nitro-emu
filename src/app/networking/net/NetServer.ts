import * as ByteBuffer from 'bytebuffer';
import * as net from 'net';
import { EvaWireFormat, IConnection, IServer, IServerConfiguration, Server } from '../../../networking';
import { NetConnection } from './NetConnection';

export class NetServer extends Server implements IServer
{
    private static POLICY_BUFFER: Buffer = ByteBuffer.fromUTF8(`<?xml version=\"1.0\"?>\n<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\n<cross-domain-policy>\n<allow-access-from domain=\"*\" to-ports=\"1-31111\" />\n</cross-domain-policy>`).toBuffer();

    private _server: net.Server;

    constructor(configuration: IServerConfiguration)
    {
        super(configuration);

        this._codec     = new EvaWireFormat();

        this._server    = null;
    }

    protected onInit(): void
    {
        this._server = new net.Server();

        this._server.on('listening', this.onListening.bind(this));
        this._server.on('connection', this.onConnection.bind(this));
    }

    public listen(): void
    {
        if(!this._server) return;

        if(this._server.listening) return;

        this._server.listen(this.configuration.port, this.configuration.ip);
    }

    protected close(): void
    {
        if(!this._server) return;

        this._server.close();

        this._server = null;
    }

    private onListening(): void
    {
        this.logger.log(`Listening ${ this.configuration.ip }:${ this.configuration.port }`);
    }

    private onConnection(socket: net.Socket): void
    {
        if(!socket) return;

        const connection = this.addConnection(new NetConnection(socket, this, socket.remoteAddress));

        if(!connection) return;

        connection.init();

        socket.on('data', buffer    => this.onConnectionData(connection, buffer));
        socket.on('close', hadError => this.onConnectionClose(connection, hadError));
        socket.on('error', error    => this.onConnectionError(connection, error));
    }

    private onConnectionData(connection: IConnection, data: Buffer): void
    {
        if(!connection || !data || !this._codec) return;
        
        const delimiter = data.readInt8(0);

        if(delimiter === 60)
        {
            connection.write(NetServer.POLICY_BUFFER);

            connection.dispose();

            return;
        }
        
        connection.processWrapper(...this._codec.decode(ByteBuffer.wrap(data)));
    }

    private onConnectionClose(connection: IConnection, hadError: boolean): void
    {
        if(!connection) return;

        if(hadError) return;

        this.removeConnection(connection);
    }

    private onConnectionError(connection: IConnection, error: Error): void
    {
        if(!connection) return;

        this.removeConnection(connection);
    }
}