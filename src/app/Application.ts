import { TimeHelper } from '../common';
import { INitroCore, INitroInstance, NitroInstance } from '../core';
import { CameraMessagesHandler, CatalogMessagesHandler, ClientMessagesHandler, DesktopMessagesHandler, GameMessagesHandler, MessengerMessagesHandler, NavigatorMessagesHandler, NitroMessages, RoomMessagesHandler, SecurityMessagesHandler, UserMessagesHandler } from './messages';
import { NetServer, SocketServer } from './networking';

export class Application extends NitroInstance implements INitroInstance
{
    private static INSTANCE: INitroInstance = null;

    constructor(core: INitroCore)
    {
        super(core);

        if(Application.INSTANCE) Application.INSTANCE.dispose();
        
        Application.INSTANCE = this;
    }

    protected async onInit(): Promise<void>
    {
        await super.onInit();

        await this.cleanup();

        this.addNetServer();

        this.addSocketServer();

        this.logger.log(`Initialized`);

        this.logger.log(`Started in ${ TimeHelper.currentTimestamp - this.timestampStarted }ms`);
    }

    private addNetServer(): void
    {
        const netServer = this.network.addServer(new NetServer({
            ip: '0.0.0.0',
            port: 1242,
            logging: {
                messages: {
                    incoming: false,
                    outgoing: false,
                    unknown: true,
                    invalid: true
                }
            }
        }));

        if(!netServer) return;

        netServer.registerMessages(new NitroMessages());

        netServer.registerHandler(new CameraMessagesHandler(this));
        netServer.registerHandler(new CatalogMessagesHandler(this));
        netServer.registerHandler(new ClientMessagesHandler(this));
        netServer.registerHandler(new DesktopMessagesHandler(this));
        netServer.registerHandler(new GameMessagesHandler(this));
        netServer.registerHandler(new MessengerMessagesHandler(this));
        netServer.registerHandler(new NavigatorMessagesHandler(this));
        netServer.registerHandler(new RoomMessagesHandler(this));
        netServer.registerHandler(new SecurityMessagesHandler(this));
        netServer.registerHandler(new UserMessagesHandler(this));

        netServer.init();

        netServer.listen();
    }

    private addSocketServer(): void
    {
        const socketServer = this.network.addServer(new SocketServer({
            ip: '0.0.0.0',
            port: 1240,
            logging: {
                messages: {
                    incoming: false,
                    outgoing: false,
                    unknown: true,
                    invalid: true
                }
            }
        }));

        if(!socketServer) return;

        socketServer.registerMessages(new NitroMessages());

        socketServer.registerHandler(new CameraMessagesHandler(this));
        socketServer.registerHandler(new CatalogMessagesHandler(this));
        socketServer.registerHandler(new ClientMessagesHandler(this));
        socketServer.registerHandler(new DesktopMessagesHandler(this));
        socketServer.registerHandler(new GameMessagesHandler(this));
        socketServer.registerHandler(new MessengerMessagesHandler(this));
        socketServer.registerHandler(new NavigatorMessagesHandler(this));
        socketServer.registerHandler(new RoomMessagesHandler(this));
        socketServer.registerHandler(new SecurityMessagesHandler(this));
        socketServer.registerHandler(new UserMessagesHandler(this));

        socketServer.init();

        socketServer.listen();
    }

    private async cleanup(): Promise<void>
    {
        await this.core.database.entityManager.query(`UPDATE users SET online = '0'`);
        await this.core.database.entityManager.query(`UPDATE rooms SET users_now = '0'`);
    }

    public static get instance(): INitroInstance
    {
        return this.INSTANCE || null;
    }
}