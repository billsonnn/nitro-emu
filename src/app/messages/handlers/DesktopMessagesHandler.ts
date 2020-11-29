import { IMessageHandler, MessageHandler } from '../../../networking';
import { DesktopCampaignsEvent, DesktopNewsEvent, DesktopViewEvent } from '../incoming';
import { DesktopCampaignComposer } from '../outgoing';

export class DesktopMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new DesktopCampaignsEvent(this.onDesktopCampaignsEvent.bind(this)));
        this.registerEvent(new DesktopNewsEvent(this.onDesktopNewsEvent.bind(this)));
        this.registerEvent(new DesktopViewEvent(this.onDesktopViewEvent.bind(this)));
    }

    private onDesktopCampaignsEvent(event: DesktopCampaignsEvent): void
    {
        if(!(event instanceof DesktopCampaignsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        event.connection.processComposer(new DesktopCampaignComposer());
    }

    private onDesktopNewsEvent(event: DesktopNewsEvent): void
    {
        if(!(event instanceof DesktopNewsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onDesktopViewEvent(event: DesktopViewEvent): void
    {
        if(!(event instanceof DesktopViewEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.clearRoomUnit();
    }
}