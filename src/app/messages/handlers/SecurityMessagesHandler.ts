import { UserRooms } from '../../../core';
import { IMessageHandler, MessageHandler } from '../../../networking';
import { SecurityMachineEvent, SecurityTicketEvent } from '../incoming';
import { AuthenticatedComposer, SecurityMachineComposer, UserAchievementScoreComposer, UserFirstLoginOfDayComposer, UserFurnitureRefreshComposer, UserHomeRoomComposer, UserPermissionsComposer, UserRightsComposer, UserRoomFavoriteCountComposer } from '../outgoing';

export class SecurityMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new SecurityMachineEvent(this.onSecurityMachineEvent.bind(this)));
        this.registerEvent(new SecurityTicketEvent(this.onSecurityTicketEvent.bind(this)));
    }

    private onSecurityMachineEvent(event: SecurityMachineEvent): void
    {
        if(!(event instanceof SecurityMachineEvent)) return;

        const machineId = event.getParser().machineId;

        if(!machineId)
        {
            event.connection.dispose();

            return;
        }

        event.connection.processComposer(new SecurityMachineComposer(machineId));
    }

    private async onSecurityTicketEvent(event: SecurityTicketEvent): Promise<void>
    {
        if(!(event instanceof SecurityTicketEvent)) return;

        const userId = await this.instance.core.security.getUserIdFromTicket(event.getParser().ticket, event.connection.ip);

        if(!userId) return event.connection.dispose();

        const user = await this.instance.core.user.createUser(userId, event.connection);

        if(!user) return event.connection.dispose();

        user.details.updateOnline(true);

        const habboClub     = (user.inventory && user.inventory.subscriptions && user.inventory.subscriptions.hasHabboClub()) || false;
        const clientRank    = (user.rank && user.rank.clientRank) || 0;
        const isAmbassador  = false;

        event.connection.processComposer(
            new AuthenticatedComposer(),
            new UserRightsComposer(),
            new UserPermissionsComposer(habboClub, clientRank, isAmbassador),
            new UserAchievementScoreComposer(user.details.achievementScore),
            new UserHomeRoomComposer(user.details.homeRoom),
            new UserFirstLoginOfDayComposer(user.details.firstLoginOfDay),
            new UserRoomFavoriteCountComposer(UserRooms.MAX_FAVORITE_ROOMS, user.inventory.rooms.favoriteRoomIds),
            new UserFurnitureRefreshComposer()
        );
    }
}