import { UserCurrency } from '../../../core';
import { IMessageHandler, MessageHandler } from '../../../networking';
import { InventoryUnknownEvent, UserBadgesCurrentEvent, UserBadgesEvent, UserBadgesUpdateEvent, UserBotsEvent, UserCurrencyEvent, UserFigureEvent, UserFurniture2Event, UserFurnitureEvent, UserInfoEvent, UserMottoEvent, UserOutfitSaveEvent, UserOutfitsEvent, UserProfileEvent, UserRoomFavoriteEvent, UserRoomFavoriteRemoveEvent, UserRoomLikeEvent, UserSettingsCameraEvent, UserSettingsChatStyleEvent, UserSettingsEvent, UserSettingsInvitesEvent, UserSettingsOldChatEvent, UserSettingsVolumeEvent, UserSubscriptionEvent, UserTagsEvent } from '../incoming';
import { RoomForwardComposer, UserBadgesComposer, UserBadgesCurrentComposer, UserBotsComposer, UserCreditsComposer, UserCurrencyComposer, UserInfoComposer, UserOutfitsComposer, UserPerksComposer, UserProfileComposer, UserSettingsComposer, UserSubscriptionComposer } from '../outgoing';

export class UserMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new UserFigureEvent(this.onUserFigureEvent.bind(this)));
        this.registerEvent(new UserInfoEvent(this.onUserInfoEvent.bind(this)));
        this.registerEvent(new UserMottoEvent(this.onUserMottoEvent.bind(this)));
        this.registerEvent(new UserProfileEvent(this.onUserProfileEvent.bind(this)));
        this.registerEvent(new UserTagsEvent(this.onUserTagsEvent.bind(this)));
        this.registerEvent(new UserBadgesCurrentEvent(this.onUserBadgesCurrentEvent.bind(this)));
        this.registerEvent(new UserBadgesEvent(this.onUserBadgesEvent.bind(this)));
        this.registerEvent(new UserBadgesUpdateEvent(this.onUserBadgesUpdateEvent.bind(this)));
        this.registerEvent(new UserBotsEvent(this.onUserBotsEvent.bind(this)));
        this.registerEvent(new UserOutfitSaveEvent(this.onUserOutfitSaveEvent.bind(this)));
        this.registerEvent(new UserOutfitsEvent(this.onUserOutfitsEvent.bind(this)));
        this.registerEvent(new UserCurrencyEvent(this.onUserCurrencyEvent.bind(this)));
        this.registerEvent(new UserFurnitureEvent(this.onUserFurnitureEvent.bind(this)));
        this.registerEvent(new UserFurniture2Event(this.onUserFurnitureEvent.bind(this)));
        this.registerEvent(new UserRoomFavoriteEvent(this.onUserRoomFavoriteEvent.bind(this)));
        this.registerEvent(new UserRoomFavoriteRemoveEvent(this.onUserRoomFavoriteRemoveEvent.bind(this)));
        this.registerEvent(new UserRoomLikeEvent(this.onUserRoomLikeEvent.bind(this)));
        this.registerEvent(new UserSubscriptionEvent(this.onUserSubscriptionEvent.bind(this)));
        this.registerEvent(new UserSettingsCameraEvent(this.onUserSettingsCameraEvent.bind(this)));
        this.registerEvent(new UserSettingsChatStyleEvent(this.onUserSettingsChatStyleEvent.bind(this)));
        this.registerEvent(new UserSettingsEvent(this.onUserSettingsEvent.bind(this)));
        this.registerEvent(new UserSettingsInvitesEvent(this.onUserSettingsInvitesEvent.bind(this)));
        this.registerEvent(new UserSettingsOldChatEvent(this.onUserSettingsOldChatEvent.bind(this)));
        this.registerEvent(new UserSettingsVolumeEvent(this.onUserSettingsVolumeEvent.bind(this)));
        this.registerEvent(new InventoryUnknownEvent(null));
    }

    private onUserFigureEvent(event: UserFigureEvent): void
    {
        if(!(event instanceof UserFigureEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.updateFigure(event.getParser().figure, event.getParser().gender);
    }

    private onUserInfoEvent(event: UserInfoEvent): void
    {
        if(!(event instanceof UserInfoEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        event.connection.processComposer(new UserInfoComposer(user), new UserPerksComposer());

        event.connection.processComposer(new RoomForwardComposer(user.details.homeRoom));
    }

    private onUserMottoEvent(event: UserMottoEvent): void
    {
        if(!(event instanceof UserMottoEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.updateMotto(event.getParser().motto);
    }

    private async onUserProfileEvent(event: UserProfileEvent): Promise<void>
    {
        if(!(event instanceof UserProfileEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const profile = await this.instance.core.user.getOfflineUserById(event.getParser().userId);

        if(!profile) return;

        const isFriend      = (user.messenger && user.messenger.getFriend(profile.id)) ? true : false;
        const isRequested   = (user.messenger && user.messenger.didRequest(profile.id)) ? true : false;

        event.connection.processComposer(new UserProfileComposer(profile, isFriend, isRequested))
    }

    private onUserTagsEvent(event: UserTagsEvent): void
    {
        if(!(event instanceof UserTagsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private async onUserBadgesCurrentEvent(event: UserBadgesCurrentEvent): Promise<void>
    {
        if(!(event instanceof UserBadgesCurrentEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const profile = await this.instance.core.user.getOfflineUserById(event.getParser().userId);

        if(!profile || !profile.inventory || !profile.inventory.badges) return;

        const badges = await profile.inventory.badges.getCurrentBadges();
        
        event.connection.processComposer(new UserBadgesCurrentComposer(profile.id, badges));
    }

    private onUserBadgesEvent(event: UserBadgesEvent): Promise<void>
    {
        if(!(event instanceof UserBadgesEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.badges) return;

        event.connection.processComposer(new UserBadgesComposer(user.inventory.badges.badges.values()));
    }

    private async onUserBadgesUpdateEvent(event: UserBadgesUpdateEvent): Promise<void>
    {
        if(!(event instanceof UserBadgesUpdateEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.badges) return;

        await user.inventory.badges.updateCurrentBadges(event.getParser().slots);

        const badges = await user.inventory.badges.getCurrentBadges();

        event.connection.processComposer(new UserBadgesCurrentComposer(user.id, badges));
    }

    private async onUserBotsEvent(event: UserBotsEvent): Promise<void>
    {
        if(!(event instanceof UserBotsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.bots) return;

        event.connection.processComposer(new UserBotsComposer(user.inventory.bots.bots.values()));
    }

    private onUserOutfitSaveEvent(event: UserOutfitSaveEvent): Promise<void>
    {
        if(!(event instanceof UserOutfitSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.outfits) return;

        user.inventory.outfits.addOutfit(event.getParser().figure, event.getParser().gender, event.getParser().slot);
    }

    private onUserOutfitsEvent(event: UserOutfitsEvent): Promise<void>
    {
        if(!(event instanceof UserOutfitsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.outfits) return;

        event.connection.processComposer(new UserOutfitsComposer(user.inventory.outfits.outfits.values()));
    }

    private onUserCurrencyEvent(event: UserCurrencyEvent): void
    {
        if(!(event instanceof UserCurrencyEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.currency) return;

        const credits = user.inventory.currency.getCurrency(UserCurrency.CREDITS_TYPE);

        event.connection.processComposer(new UserCreditsComposer(credits ? credits.amount : 0));

        event.connection.processComposer(new UserCurrencyComposer(user.inventory.currency.currencies.values()));
    }

    private onUserFurnitureEvent(event: UserFurnitureEvent): void
    {
        if(!(event instanceof UserFurnitureEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.furniture) return;

        user.inventory.furniture.sendAllFurniture();
    }

    private async onUserRoomFavoriteEvent(event: UserRoomFavoriteEvent): Promise<void>
    {
        if(!(event instanceof UserRoomFavoriteEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.rooms) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        user.inventory.rooms.favoriteRoom(room);
    }

    private async onUserRoomFavoriteRemoveEvent(event: UserRoomFavoriteRemoveEvent): Promise<void>
    {
        if(!(event instanceof UserRoomFavoriteRemoveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.rooms) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        user.inventory.rooms.removeFavoriteRoom(room);
    }

    private onUserRoomLikeEvent(event: UserRoomLikeEvent): void
    {
        if(!(event instanceof UserRoomLikeEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.rooms) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        user.inventory.rooms.likeRoom(room);
    }

    private onUserSubscriptionEvent(event: UserSubscriptionEvent): void
    {
        if(!(event instanceof UserSubscriptionEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.inventory || !user.inventory.subscriptions) return;

        const subscription = user.inventory.subscriptions.getSubscription(event.getParser().type);

        if(!subscription) return;

        event.connection.processComposer(new UserSubscriptionComposer(subscription));
    }

    private onUserSettingsCameraEvent(event: UserSettingsCameraEvent): void
    {
        if(!(event instanceof UserSettingsCameraEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.cameraFocus = event.getParser().flag;
    }

    private onUserSettingsChatStyleEvent(event: UserSettingsChatStyleEvent): void
    {
        if(!(event instanceof UserSettingsChatStyleEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.updateChatStyle(event.getParser().chatStyle);
    }

    private onUserSettingsEvent(event: UserSettingsEvent): void
    {
        if(!(event instanceof UserSettingsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        event.connection.processComposer(new UserSettingsComposer(user.details.settings));
    }

    private onUserSettingsInvitesEvent(event: UserSettingsInvitesEvent): void
    {
        if(!(event instanceof UserSettingsInvitesEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.ignoreInvites = event.getParser().flag;
    }

    private onUserSettingsOldChatEvent(event: UserSettingsOldChatEvent): void
    {
        if(!(event instanceof UserSettingsOldChatEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.oldChat = event.getParser().flag;
    }

    private onUserSettingsVolumeEvent(event: UserSettingsVolumeEvent): void
    {
        if(!(event instanceof UserSettingsVolumeEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }
}