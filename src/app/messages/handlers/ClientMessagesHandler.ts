import { IMessageHandler, MessageHandler } from '../../../networking';
import { ClientEventTrackerEvent, ClientLatencyEvent, ClientPongEvent, ClientReleaseVersionEvent, ClientVariablesEvent } from '../incoming';
import { ClientLatencyComposer } from '../outgoing';

export class ClientMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new ClientEventTrackerEvent(this.onClientEventTrackerEvent.bind(this)));
        this.registerEvent(new ClientLatencyEvent(this.onClientLatencyEvent.bind(this)));
        this.registerEvent(new ClientPongEvent(this.onClientPongEvent.bind(this)));
        this.registerEvent(new ClientReleaseVersionEvent(this.onClientReleaseVersionEvent.bind(this)));
        this.registerEvent(new ClientVariablesEvent(this.onClientVariablesEvent.bind(this)));
    }

    private onClientEventTrackerEvent(event: ClientEventTrackerEvent): void
    {
        if(!(event instanceof ClientEventTrackerEvent)) return;
    }

    private onClientLatencyEvent(event: ClientLatencyEvent): void
    {
        if(!(event instanceof ClientLatencyEvent)) return;

        event.connection.processComposer(new ClientLatencyComposer(event.getParser().latency));
    }

    private onClientPongEvent(event: ClientPongEvent): void
    {
        if(!(event instanceof ClientPongEvent)) return;

        event.connection.receivePong();
    }

    private onClientReleaseVersionEvent(event: ClientReleaseVersionEvent): void
    {
        if(!(event instanceof ClientReleaseVersionEvent)) return;
    }

    private onClientVariablesEvent(event: ClientVariablesEvent): void
    {
        if(!(event instanceof ClientVariablesEvent)) return;
    }
}