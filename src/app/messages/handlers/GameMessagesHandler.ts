import { IMessageHandler, MessageHandler } from '../../../networking';
import { GamesInitEvent, GamesListEvent } from '../incoming';

export class GameMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new GamesInitEvent(this.onGamesInitEvent.bind(this)));
        this.registerEvent(new GamesListEvent(this.onGamesListEvent.bind(this)));
    }

    private onGamesInitEvent(event: GamesInitEvent): void
    {
        if(!(event instanceof GamesInitEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onGamesListEvent(event: GamesListEvent): void
    {
        if(!(event instanceof GamesListEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }
}