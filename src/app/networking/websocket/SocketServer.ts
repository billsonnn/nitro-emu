import * as ByteBuffer from 'bytebuffer';
import * as express from 'express';
import * as http from 'http';
import * as ws from 'ws';
import { EvaWireFormat, IConnection, IServer, IServerConfiguration, Server } from '../../../networking';
import { SocketConnection } from './SocketConnection';

export class SocketServer extends Server implements IServer
{
    private _express: express.Express;
    private _webServer: http.Server;
    private _server: ws.Server;

    constructor(configuration: IServerConfiguration)
    {
        super(configuration);

        this._codec     = new EvaWireFormat();

        this._express   = null;
        this._webServer = null;
        this._server    = null;
    }

    protected onInit(): void
    {
        this.setupWebServer();
        this.setupSocketServer();
    }

    public listen(): void
    {
        if(!this._webServer) return;

        if(this._webServer.listening) return;

        this._webServer.listen(this.configuration.port, this.configuration.ip);
    }

    protected close(): void
    {
        if(this._server)
        {
            this._server.close();

            this._server = null;
        }

        if(this._webServer)
        {
            this._webServer.close();

            this._webServer = null;
        }
    }

    private setupWebServer(): void
    {
        if(this._express || this._webServer) return;

        this._express = express();

        this._express.use((req: express.Request, res: express.Response, next: express.NextFunction) =>
        {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            next();
        });
        
        this._express.use(express.static('./public'));

        this._webServer = http.createServer(this._express);

        this._webServer.on('listening', this.onListening.bind(this));
    }

    private setupSocketServer(): void
    {
        if(this._server || !this._webServer) return;

        this._server = new ws.Server({ server: this._webServer });

        this._server.on('connection', this.onConnection.bind(this));
    }

    private onListening(): void
    {
        this.logger.log(`Listening ${ this.configuration.ip }:${ this.configuration.port }`);
    }

    private onConnection(socket: ws, request: http.IncomingMessage): void
    {
        if(!socket || !request) return;

        const ip = (request && request.headers['x-forwarded-for']) ? request.headers['x-forwarded-for'].toString() : request.connection.remoteAddress;

        const connection = this.addConnection(new SocketConnection(socket, this, ip));

        if(!connection) return;

        connection.init();

        socket.on('message', data   => this.onConnectionData(connection, data as Buffer));
        socket.on('close', code     => this.onConnectionClose(connection, code));
        socket.on('error', error    => this.onConnectionError(connection, error));
    }

    private onConnectionData(connection: IConnection, data: Buffer): void
    {
        if(!connection || !data || !this._codec) return;

        connection.processWrapper(...this._codec.decode(ByteBuffer.wrap(data)));
    }

    private onConnectionClose(connection: IConnection, code: number): void
    {
        if(!connection) return;

        this.removeConnection(connection);
    }

    private onConnectionError(connection: IConnection, error: Error): void
    {
        if(!connection) return;

        this.removeConnection(connection);
    }
}