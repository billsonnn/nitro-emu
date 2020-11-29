import { IMessageConfiguration } from '../../networking';
import { CameraPriceEvent, CameraSaveEvent, CameraThumbnailEvent, CatalogClubEvent, CatalogDiscountConfigEvent, CatalogGiftConfigEvent, CatalogMarketplaceConfigEvent, CatalogModeEvent, CatalogPageEvent, CatalogPurchaseEvent, CatalogRecyclerPrizesEvent, CatalogSearchEvent, ClientEventTrackerEvent, ClientLatencyEvent, ClientPongEvent, ClientReleaseVersionEvent, ClientVariablesEvent, DesktopCampaignsEvent, DesktopNewsEvent, DesktopViewEvent, FurnitureDiceCloseEvent, FurnitureDiceOpenEvent, FurnitureExchangeEvent, FurnitureFloorUpdateEvent, FurnitureMultiStateEvent, FurniturePickupEvent, FurniturePlaceEvent, FurnitureStackHelperEvent, FurnitureWiredSaveActionEvent, FurnitureWiredSaveConditionEvent, FurnitureWiredSaveTriggerEvent, GamesInitEvent, GamesListEvent, IncomingHeader, InventoryUnknownEvent, MessengerAcceptEvent, MessengerChatEvent, MessengerDeclineEvent, MessengerFollowEvent, MessengerFriendsEvent, MessengerInitEvent, MessengerRelationshipsEvent, MessengerRelationshipUpdateEvent, MessengerRemoveEvent, MessengerRequestEvent, MessengerRequestsEvent, MessengerRoomInviteEvent, MessengerSearchEvent, MessengerUpdatesEvent, NavigatorCategoriesEvent, NavigatorInitEvent, NavigatorPromotedRoomsEvent, NavigatorSearchCloseEvent, NavigatorSearchEvent, NavigatorSearchOpenEvent, NavigatorSearchSaveEvent, NavigatorSettingsEvent, NavigatorSettingsSaveEvent, RoomBanGiveEvent, RoomBanListEvent, RoomBanRemoveEvent, RoomCreateEvent, RoomDeleteEvent, RoomDoorbellEvent, RoomEnterEvent, RoomInfoEvent, RoomKickEvent, RoomModel2Event, RoomModelEvent, RoomMuteEvent, RoomMuteUserEvent, RoomRightsGiveEvent, RoomRightsListEvent, RoomRightsRemoveAllEvent, RoomRightsRemoveEvent, RoomRightsRemoveOwnEvent, RoomSettingsEvent, RoomSettingsSaveEvent, RoomUnitActionEvent, RoomUnitChatEvent, RoomUnitChatShoutEvent, RoomUnitChatWhisperEvent, RoomUnitDanceEvent, RoomUnitLookEvent, RoomUnitSignEvent, RoomUnitSitEvent, RoomUnitTypingStartEvent, RoomUnitTypingStopEvent, RoomUnitWalkEvent, SecurityMachineEvent, SecurityTicketEvent, UserBadgesCurrentEvent, UserBadgesEvent, UserBadgesUpdateEvent, UserBotsEvent, UserCurrencyEvent, UserFigureEvent, UserFurniture2Event, UserFurnitureEvent, UserInfoEvent, UserMottoEvent, UserOutfitSaveEvent, UserOutfitsEvent, UserProfileEvent, UserRoomFavoriteEvent, UserRoomFavoriteRemoveEvent, UserRoomLikeEvent, UserSettingsCameraEvent, UserSettingsChatStyleEvent, UserSettingsEvent, UserSettingsInvitesEvent, UserSettingsOldChatEvent, UserSettingsVolumeEvent, UserSubscriptionEvent, UserTagsEvent } from './incoming';
import { AuthenticatedComposer, CameraPriceComposer, CameraThumbnailSavedComposer, CameraUrlComposer, CatalogClubComposer, CatalogDiscountConfigComposer, CatalogGiftConfigComposer, CatalogMarketplaceConfigComposer, CatalogModeComposer, CatalogPageComposer, CatalogPagesComposer, CatalogPurchaseComposer, CatalogPurchaseFailedComposer, CatalogPurchaseUnavailableComposer, CatalogRecyclerPrizesComposer, CatalogSearchComposer, CatalogSoldOutComposer, CatalogUpdatedComposer, ClientLatencyComposer, ClientPingComposer, DesktopCampaignComposer, DesktopViewComposer, FurnitureDataComposer, FurnitureFloorAddComposer, FurnitureFloorComposer, FurnitureFloorRemoveComposer, FurnitureFloorUpdateComposer, FurnitureStackHelperComposer, FurnitureStateComposer, FurnitureWiredActionComposer, FurnitureWiredConditionComposer, FurnitureWiredSaveComposer, FurnitureWiredTriggerComposer, GenericErrorComposer, MessengerChatComposer, MessengerFriendsComposer, MessengerInitComposer, MessengerRelationshipsComposer, MessengerRequestComposer, MessengerRequestsComposer, MessengerRoomInviteComposer, MessengerSearchComposer, MessengerUpdateComposer, NavigatorCategoriesComposer, NavigatorCollapsedCategoriesComposer, NavigatorEventCategoriesComposer, NavigatorLiftedRoomsComposer, NavigatorSearchComposer, NavigatorSearchesSavedComposer, NavigatorSettingsComposer, NavigatorTabsComposer, NotificationListComposer, OutgoingHeader, RoomBanListComposer, RoomBanRemoveComposer, RoomChatSettingsComposer, RoomCreatedComposer, RoomDoorbellAddComposer, RoomDoorbellCloseComposer, RoomDoorbellDeniedComposer, RoomEnterComposer, RoomEnterErrorComposer, RoomForwardComposer, RoomHeightMapComposer, RoomInfoComposer, RoomInfoOwnerComposer, RoomModelComposer, RoomModelNameComposer, RoomMuteComposer, RoomMuteUserComposer, RoomOwnerComposer, RoomPaintComposer, RoomQueueStatusComposer, RoomRightsComposer, RoomRightsListAddComposer, RoomRightsListComposer, RoomRightsListRemoveComposer, RoomRollingComposer, RoomScoreComposer, RoomSettingsComposer, RoomSettingsErrorComposer, RoomSettingsSavedComposer, RoomSettingsUpdatedComposer, RoomStackHeightComposer, RoomThicknessComposer, RoomUnitActionComposer, RoomUnitChatComposer, RoomUnitChatShoutComposer, RoomUnitChatWhisperComposer, RoomUnitComposer, RoomUnitDanceComposer, RoomUnitEffectComposer, RoomUnitHandItemComposer, RoomUnitIdleComposer, RoomUnitInfoComposer, RoomUnitRemoveComposer, RoomUnitStatusComposer, RoomUnitTypingComposer, SecurityMachineComposer, UserAchievementScoreComposer, UserBadgesComposer, UserBadgesCurrentComposer, UserBotAddComposer, UserBotRemoveComposer, UserBotsComposer, UserClothingComposer, UserCreditsComposer, UserCurrencyComposer, UserFigureComposer, UserFirstLoginOfDayComposer, UserFurnitureAddComposer, UserFurnitureComposer, UserFurnitureRefreshComposer, UserFurnitureRemoveComposer, UserHomeRoomComposer, UserInfoComposer, UserOutfitsComposer, UserPerksComposer, UserPermissionsComposer, UserProfileComposer, UserRightsComposer, UserRoomFavoriteComposer, UserRoomFavoriteCountComposer, UserSettingsComposer, UserSubscriptionComposer } from './outgoing';
import { FurnitureWallAddComposer, FurnitureWallComposer, FurnitureWallRemoveComposer, FurnitureWallUpdateComposer } from './outgoing/room/furniture/wall';

export class NitroMessages implements IMessageConfiguration
{
    private _events: Map<number, Function>;
    private _composers: Map<number, Function>;

    constructor()
    {
        this._events    = new Map();
        this._composers = new Map();

        this.registerEvents();
        this.registerComposers();
    }
    
    private registerEvents(): void
    {
        // CAMERA
        this._events.set(IncomingHeader.CAMERA_PRICE, CameraPriceEvent);
        this._events.set(IncomingHeader.CAMERA_SAVE, CameraSaveEvent);
        this._events.set(IncomingHeader.CAMERA_THUMBNAIL, CameraThumbnailEvent);

        // CATALOG
        this._events.set(IncomingHeader.CATALOG_CLUB, CatalogClubEvent);
        this._events.set(IncomingHeader.CATALOG_MODE, CatalogModeEvent);
        this._events.set(IncomingHeader.CATALOG_PAGE, CatalogPageEvent);
        this._events.set(IncomingHeader.CATALOG_PURCHASE, CatalogPurchaseEvent);
        this._events.set(IncomingHeader.CATALOG_SEARCH, CatalogSearchEvent);

            // DISCOUNT
            this._events.set(IncomingHeader.CATALOG_DISCOUNT_CONFIG, CatalogDiscountConfigEvent);

            // GIFT
            this._events.set(IncomingHeader.CATALOG_GIFT_CONFIG, CatalogGiftConfigEvent);

            // MARKETPLACE
            this._events.set(IncomingHeader.CATALOG_MARKETPLACE_CONFIG, CatalogMarketplaceConfigEvent);

            // RECYCLER
            this._events.set(IncomingHeader.CATALOG_RECYCLER_PRIZES, CatalogRecyclerPrizesEvent);

        // CLIENT
        this._events.set(IncomingHeader.CLIENT_EVENT_TRACKER, ClientEventTrackerEvent);
        this._events.set(IncomingHeader.CLIENT_LATENCY, ClientLatencyEvent);
        this._events.set(IncomingHeader.CLIENT_PONG, ClientPongEvent);
        this._events.set(IncomingHeader.CLIENT_RELEASE_VERSION, ClientReleaseVersionEvent);
        this._events.set(IncomingHeader.CLIENT_VARIABLES, ClientVariablesEvent);

        // DESKTOP
        this._events.set(IncomingHeader.DESKTOP_CAMPAIGNS, DesktopCampaignsEvent);
        this._events.set(IncomingHeader.DESKTOP_NEWS, DesktopNewsEvent);
        this._events.set(IncomingHeader.DESKTOP_VIEW, DesktopViewEvent);

        // GAMES
        this._events.set(IncomingHeader.GAMES_INIT, GamesInitEvent);
        this._events.set(IncomingHeader.GAMES_LIST, GamesListEvent);

        // NAVIGATOR
        this._events.set(IncomingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesEvent);
        this._events.set(IncomingHeader.NAVIGATOR_INIT, NavigatorInitEvent);
        this._events.set(IncomingHeader.NAVIGATOR_PROMOTED_ROOMS, NavigatorPromotedRoomsEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsEvent);
        this._events.set(IncomingHeader.NAVIGATOR_SETTINGS_SAVE, NavigatorSettingsSaveEvent);

            // SEARCH
            this._events.set(IncomingHeader.NAVIGATOR_SEARCH_CLOSE, NavigatorSearchCloseEvent);
            this._events.set(IncomingHeader.NAVIGATOR_SEARCH, NavigatorSearchEvent);
            this._events.set(IncomingHeader.NAVIGATOR_SEARCH_OPEN, NavigatorSearchOpenEvent);
            this._events.set(IncomingHeader.NAVIGATOR_SEARCH_SAVE, NavigatorSearchSaveEvent);

        // ROOMS
        this._events.set(IncomingHeader.ROOM_CREATE, RoomCreateEvent);
        this._events.set(IncomingHeader.ROOM_DELETE, RoomDeleteEvent);

            // ACCESS
            this._events.set(IncomingHeader.ROOM_ACCESS_DOORBELL, RoomDoorbellEvent);
            this._events.set(IncomingHeader.ROOM_ACCESS_ENTER, RoomEnterEvent);
            this._events.set(IncomingHeader.ROOM_ACCESS_KICK, RoomKickEvent);

                // BAN
                this._events.set(IncomingHeader.ROOM_ACCESS_BAN_GIVE, RoomBanGiveEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_BAN_LIST, RoomBanListEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_BAN_REMOVE, RoomBanRemoveEvent);

                // MUTE
                this._events.set(IncomingHeader.ROOM_ACCESS_MUTE, RoomMuteEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_MUTE_USER, RoomMuteUserEvent);

                // RIGHTS
                this._events.set(IncomingHeader.ROOM_ACCESS_RIGHTS_GIVE, RoomRightsGiveEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_RIGHTS_LIST, RoomRightsListEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_RIGHTS_REMOVE_ALL, RoomRightsRemoveAllEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_RIGHTS_REMOVE, RoomRightsRemoveEvent);
                this._events.set(IncomingHeader.ROOM_ACCESS_RIGHTS_REMOVE_OWN, RoomRightsRemoveOwnEvent);

            // DATA
            this._events.set(IncomingHeader.ROOM_DATA_INFO, RoomInfoEvent);
            this._events.set(IncomingHeader.ROOM_DATA_SETTINGS, RoomSettingsEvent);
            this._events.set(IncomingHeader.ROOM_DATA_SETTINGS_SAVE, RoomSettingsSaveEvent);

            // FURNITURE
            this._events.set(IncomingHeader.FURNITURE_PICKUP, FurniturePickupEvent);
            this._events.set(IncomingHeader.FURNITURE_PLACE, FurniturePlaceEvent);

                // FLOOR
                this._events.set(IncomingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateEvent);

                // LOGIC
                this._events.set(IncomingHeader.FURNITURE_LOGIC_DICE_OPEN, FurnitureDiceOpenEvent);
                this._events.set(IncomingHeader.FURNITURE_LOGIC_DICE_CLOSE, FurnitureDiceCloseEvent);
                this._events.set(IncomingHeader.FURNITURE_LOGIC_EXCHANGE, FurnitureExchangeEvent);
                this._events.set(IncomingHeader.FURNITURE_LOGIC_MULTISTATE, FurnitureMultiStateEvent);
                this._events.set(IncomingHeader.FURNITURE_LOGIC_STACK_HELPER, FurnitureStackHelperEvent);

                    // WIRED
                    this._events.set(IncomingHeader.FURNITURE_LOGIC_WIRED_ACTION_SAVE, FurnitureWiredSaveActionEvent);
                    this._events.set(IncomingHeader.FURNITURE_LOGIC_WIRED_CONDITION_SAVE, FurnitureWiredSaveConditionEvent);
                    this._events.set(IncomingHeader.FURNITURE_LOGIC_WIRED_TRIGGER_SAVE, FurnitureWiredSaveTriggerEvent);

            // MAPPING
            this._events.set(IncomingHeader.ROOM_MODEL, RoomModelEvent);
            this._events.set(IncomingHeader.ROOM_MODEL2, RoomModel2Event);

            // UNIT
            this._events.set(IncomingHeader.UNIT_ACTION, RoomUnitActionEvent);
            this._events.set(IncomingHeader.UNIT_DANCE, RoomUnitDanceEvent);
            this._events.set(IncomingHeader.UNIT_LOOK, RoomUnitLookEvent);
            this._events.set(IncomingHeader.UNIT_SIGN, RoomUnitSignEvent);
            this._events.set(IncomingHeader.UNIT_SIT, RoomUnitSitEvent);
            this._events.set(IncomingHeader.UNIT_WALK, RoomUnitWalkEvent);

                // CHAT
                this._events.set(IncomingHeader.UNIT_CHAT, RoomUnitChatEvent);
                this._events.set(IncomingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutEvent);
                this._events.set(IncomingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperEvent);
                this._events.set(IncomingHeader.UNIT_CHAT_TYPING, RoomUnitTypingStartEvent);
                this._events.set(IncomingHeader.UNIT_CHAT_TYPING_STOP, RoomUnitTypingStopEvent);

        // SECURITY
        this._events.set(IncomingHeader.SECURITY_MACHINE, SecurityMachineEvent);
        this._events.set(IncomingHeader.SECURITY_TICKET, SecurityTicketEvent);

        // USER

            // DATA
            this._events.set(IncomingHeader.USER_DATA_FIGURE, UserFigureEvent);
            this._events.set(IncomingHeader.USER_DATA_INFO, UserInfoEvent);
            this._events.set(IncomingHeader.USER_DATA_MOTTO, UserMottoEvent);
            this._events.set(IncomingHeader.USER_DATA_PROFILE, UserProfileEvent);
            this._events.set(IncomingHeader.USER_DATA_TAGS, UserTagsEvent);

            // INVENTORY
            this._events.set(IncomingHeader.INVENTORY_UNKNOWN, InventoryUnknownEvent);

                // BADGES
                this._events.set(IncomingHeader.USER_INVENTORY_BADGES_CURRENT, UserBadgesCurrentEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_BADGES, UserBadgesEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_BADGES_CURRENT_UPDATE, UserBadgesUpdateEvent);

                // BOT
                this._events.set(IncomingHeader.USER_INVENTORY_BOTS, UserBotsEvent);

                // CLOTHING
                this._events.set(IncomingHeader.USER_INVENTORY_OUTFIT_SAVE, UserOutfitSaveEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_OUTFITS, UserOutfitsEvent);

                // CURRENCY
                this._events.set(IncomingHeader.USER_INVENTORY_CURRENCY, UserCurrencyEvent);

                // FURNITURE
                this._events.set(IncomingHeader.USER_INVENTORY_FURNITURE, UserFurnitureEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_FURNITURE2, UserFurniture2Event);

                // ROOM
                this._events.set(IncomingHeader.USER_INVENTORY_ROOM_FAVORITE, UserRoomFavoriteEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_ROOM_FAVORITE_REMOVE, UserRoomFavoriteRemoveEvent);
                this._events.set(IncomingHeader.USER_INVENTORY_ROOM_LIKE, UserRoomLikeEvent);

                // SUBSCRIPTION
                this._events.set(IncomingHeader.USER_INVENTORY_SUBSCRIPTION, UserSubscriptionEvent);

            // MESSENGER
            this._events.set(IncomingHeader.USER_MESSENGER_ACCEPT, MessengerAcceptEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_CHAT, MessengerChatEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_DECLINE, MessengerDeclineEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_FOLLOW, MessengerFollowEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_FRIENDS, MessengerFriendsEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_INIT, MessengerInitEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_RELATIONSHIPS, MessengerRelationshipsEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_RELATIONSHIPS_UPDATE, MessengerRelationshipUpdateEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_REMOVE, MessengerRemoveEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_REQUEST, MessengerRequestEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_REQUESTS, MessengerRequestsEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_ROOM_INVITE, MessengerRoomInviteEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_SEARCH, MessengerSearchEvent);
            this._events.set(IncomingHeader.USER_MESSENGER_UPDATES, MessengerUpdatesEvent);

            // SETTINGS
            this._events.set(IncomingHeader.USER_SETTINGS_CAMERA, UserSettingsCameraEvent);
            this._events.set(IncomingHeader.USER_SETTINGS_CHAT_STYLE, UserSettingsChatStyleEvent);
            this._events.set(IncomingHeader.USER_SETTINGS, UserSettingsEvent);
            this._events.set(IncomingHeader.USER_SETTINGS_INVITES, UserSettingsInvitesEvent);
            this._events.set(IncomingHeader.USER_SETTINGS_OLD_CHAT, UserSettingsOldChatEvent);
            this._events.set(IncomingHeader.USER_SETTINGS_VOLUME, UserSettingsVolumeEvent);
    }

    private registerComposers(): void
    {
        // CAMERA
        this._composers.set(OutgoingHeader.CAMERA_PRICE, CameraPriceComposer);
        this._composers.set(OutgoingHeader.CAMERA_URL, CameraUrlComposer);
        this._composers.set(OutgoingHeader.CAMERA_THUMBNAIL_SAVED, CameraThumbnailSavedComposer);

        // CATALOG
        this._composers.set(OutgoingHeader.CATALOG_CLUB, CatalogClubComposer);
        this._composers.set(OutgoingHeader.CATALOG_MODE, CatalogModeComposer);
        this._composers.set(OutgoingHeader.CATALOG_PAGE, CatalogPageComposer);
        this._composers.set(OutgoingHeader.CATALOG_PAGES, CatalogPagesComposer);
        this._composers.set(OutgoingHeader.CATALOG_SEARCH, CatalogSearchComposer);
        this._composers.set(OutgoingHeader.CATALOG_UPDATED, CatalogUpdatedComposer);

            // DISCOUNT
            this._composers.set(OutgoingHeader.DISCOUNT_CONFIG, CatalogDiscountConfigComposer);

            // GIFT
            this._composers.set(OutgoingHeader.GIFT_CONFIG, CatalogGiftConfigComposer);

            // MARKETPLACE
            this._composers.set(OutgoingHeader.MARKETPLACE_CONFIG, CatalogMarketplaceConfigComposer);

            // PURCHASE
            this._composers.set(OutgoingHeader.CATALOG_PURCHASE, CatalogPurchaseComposer);
            this._composers.set(OutgoingHeader.CATALOG_PURCHASE_FAILED, CatalogPurchaseFailedComposer);
            this._composers.set(OutgoingHeader.CATALOG_PURCHASE_UNAVAILABLE, CatalogPurchaseUnavailableComposer);
            this._composers.set(OutgoingHeader.CATALOG_SOLD_OUT, CatalogSoldOutComposer);

            // RECYCLER
            this._composers.set(OutgoingHeader.RECYCLER_PRIZES, CatalogRecyclerPrizesComposer);

        // CLIENT
        this._composers.set(OutgoingHeader.CLIENT_LATENCY, ClientLatencyComposer);
        this._composers.set(OutgoingHeader.CLIENT_PING, ClientPingComposer);

        // DESKTOP
        this._composers.set(OutgoingHeader.DESKTOP_CAMPAIGN, DesktopCampaignComposer);
        this._composers.set(OutgoingHeader.DESKTOP_VIEW, DesktopViewComposer);

        // GENERIC
        this._composers.set(OutgoingHeader.GENERIC_ERROR, GenericErrorComposer);

        // NAVIGATOR
        this._composers.set(OutgoingHeader.NAVIGATOR_CATEGORIES, NavigatorCategoriesComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_COLLAPSED, NavigatorCollapsedCategoriesComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_EVENT_CATEGORIES, NavigatorEventCategoriesComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_LIFTED, NavigatorLiftedRoomsComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_SETTINGS, NavigatorSettingsComposer);
        this._composers.set(OutgoingHeader.NAVIGATOR_TABS, NavigatorTabsComposer);

            // SEARCH
            this._composers.set(OutgoingHeader.NAVIGATOR_SEARCH, NavigatorSearchComposer);
            this._composers.set(OutgoingHeader.NAVIGATOR_SEARCHES, NavigatorSearchesSavedComposer);

        // ROOM
        this._composers.set(OutgoingHeader.ROOM_CREATED, RoomCreatedComposer);
        this._composers.set(OutgoingHeader.ROOM_ROLLING, RoomRollingComposer);

            // ACCESS
            this._composers.set(OutgoingHeader.ROOM_ENTER, RoomEnterComposer);
            this._composers.set(OutgoingHeader.ROOM_FORWARD, RoomForwardComposer);
            this._composers.set(OutgoingHeader.ROOM_OWNER, RoomOwnerComposer);

                // BAN
                this._composers.set(OutgoingHeader.ROOM_BAN_LIST, RoomBanListComposer);
                this._composers.set(OutgoingHeader.ROOM_BAN_REMOVE, RoomBanRemoveComposer);

                // DOORBELL
                this._composers.set(OutgoingHeader.ROOM_DOORBELL_ADD, RoomDoorbellAddComposer);
                this._composers.set(OutgoingHeader.ROOM_DOORBELL_CLOSE, RoomDoorbellCloseComposer);
                this._composers.set(OutgoingHeader.ROOM_DOORBELL_DENIED, RoomDoorbellDeniedComposer);

                // MUTE
                this._composers.set(OutgoingHeader.ROOM_MUTE, RoomMuteComposer);
                this._composers.set(OutgoingHeader.ROOM_MUTE_USER, RoomMuteUserComposer);

                // QUEUE
                this._composers.set(OutgoingHeader.ROOM_QUEUE_STATUS, RoomQueueStatusComposer);

                // RIGHTS
                this._composers.set(OutgoingHeader.ROOM_RIGHTS, RoomRightsComposer);
                this._composers.set(OutgoingHeader.ROOM_RIGHTS_LIST_ADD, RoomRightsListAddComposer);
                this._composers.set(OutgoingHeader.ROOM_RIGHTS_LIST, RoomRightsListComposer);
                this._composers.set(OutgoingHeader.ROOM_RIGHTS_LIST_REMOVE, RoomRightsListRemoveComposer);

            // DATA
            this._composers.set(OutgoingHeader.ROOM_SETTINGS_CHAT, RoomChatSettingsComposer);
            this._composers.set(OutgoingHeader.ROOM_ENTER_ERROR, RoomEnterErrorComposer);
            this._composers.set(OutgoingHeader.ROOM_INFO, RoomInfoComposer);
            this._composers.set(OutgoingHeader.ROOM_INFO_OWNER, RoomInfoOwnerComposer);
            this._composers.set(OutgoingHeader.ROOM_SCORE, RoomScoreComposer);
            this._composers.set(OutgoingHeader.ROOM_SETTINGS, RoomSettingsComposer);
            this._composers.set(OutgoingHeader.ROOM_SETTINGS_SAVE_ERROR, RoomSettingsErrorComposer);
            this._composers.set(OutgoingHeader.ROOM_SETTINGS_UPDATED, RoomSettingsUpdatedComposer);
            this._composers.set(OutgoingHeader.ROOM_SETTINGS_SAVE, RoomSettingsSavedComposer);

            // FURNITURE
            this._composers.set(OutgoingHeader.FURNITURE_DATA, FurnitureDataComposer);
            this._composers.set(OutgoingHeader.FURNITURE_STATE, FurnitureStateComposer);

                // FLOOR
                this._composers.set(OutgoingHeader.FURNITURE_FLOOR_ADD, FurnitureFloorAddComposer);
                this._composers.set(OutgoingHeader.FURNITURE_FLOOR, FurnitureFloorComposer);
                this._composers.set(OutgoingHeader.FURNITURE_FLOOR_REMOVE, FurnitureFloorRemoveComposer);
                this._composers.set(OutgoingHeader.FURNITURE_FLOOR_UPDATE, FurnitureFloorUpdateComposer);

                // WALL
                this._composers.set(OutgoingHeader.FURNITURE_WALL_ADD, FurnitureWallAddComposer);
                this._composers.set(OutgoingHeader.FURNITURE_WALL, FurnitureWallComposer);
                this._composers.set(OutgoingHeader.FURNITURE_WALL_REMOVE, FurnitureWallRemoveComposer);
                this._composers.set(OutgoingHeader.FURNITURE_WALL_UPDATE, FurnitureWallUpdateComposer);

                // LOGIC
                this._composers.set(OutgoingHeader.ITEM_STACK_HELPER, FurnitureStackHelperComposer);

                    // WIRED
                    this._composers.set(OutgoingHeader.WIRED_ACTION, FurnitureWiredActionComposer);
                    this._composers.set(OutgoingHeader.WIRED_CONDITION, FurnitureWiredConditionComposer);
                    this._composers.set(OutgoingHeader.WIRED_SAVE, FurnitureWiredSaveComposer);
                    this._composers.set(OutgoingHeader.WIRED_TRIGGER, FurnitureWiredTriggerComposer);


            // MAPPING
            this._composers.set(OutgoingHeader.ROOM_HEIGHT_MAP, RoomHeightMapComposer);
            this._composers.set(OutgoingHeader.ROOM_MODEL, RoomModelComposer);
            this._composers.set(OutgoingHeader.ROOM_MODEL_NAME, RoomModelNameComposer);
            this._composers.set(OutgoingHeader.ROOM_PAINT, RoomPaintComposer);
            this._composers.set(OutgoingHeader.ROOM_STACK_HEIGHT, RoomStackHeightComposer);
            this._composers.set(OutgoingHeader.ROOM_THICKNESS, RoomThicknessComposer);

            // UNIT
            this._composers.set(OutgoingHeader.UNIT_ACTION, RoomUnitActionComposer);
            this._composers.set(OutgoingHeader.UNIT, RoomUnitComposer);
            this._composers.set(OutgoingHeader.UNIT_DANCE, RoomUnitDanceComposer);
            this._composers.set(OutgoingHeader.UNIT_EFFECT, RoomUnitEffectComposer);
            this._composers.set(OutgoingHeader.UNIT_HAND_ITEM, RoomUnitHandItemComposer);
            this._composers.set(OutgoingHeader.UNIT_IDLE, RoomUnitIdleComposer);
            this._composers.set(OutgoingHeader.UNIT_INFO, RoomUnitInfoComposer);
            this._composers.set(OutgoingHeader.UNIT_REMOVE, RoomUnitRemoveComposer);
            this._composers.set(OutgoingHeader.UNIT_STATUS, RoomUnitStatusComposer);

                // CHAT
                this._composers.set(OutgoingHeader.UNIT_CHAT, RoomUnitChatComposer);
                this._composers.set(OutgoingHeader.UNIT_CHAT_SHOUT, RoomUnitChatShoutComposer);
                this._composers.set(OutgoingHeader.UNIT_CHAT_WHISPER, RoomUnitChatWhisperComposer);
                this._composers.set(OutgoingHeader.UNIT_TYPING, RoomUnitTypingComposer);

        // SECURITY
        this._composers.set(OutgoingHeader.AUTHENTICATED, AuthenticatedComposer);
        this._composers.set(OutgoingHeader.SECURITY_MACHINE, SecurityMachineComposer);

        // USER

            // ACCESS
            this._composers.set(OutgoingHeader.USER_PERKS, UserPerksComposer);
            this._composers.set(OutgoingHeader.USER_PERMISSIONS, UserPermissionsComposer);
            this._composers.set(OutgoingHeader.USER_RIGHTS, UserRightsComposer);

            // DATA
            this._composers.set(OutgoingHeader.USER_FIGURE, UserFigureComposer);
            this._composers.set(OutgoingHeader.USER_ACHIEVEMENT_SCORE, UserAchievementScoreComposer);
            this._composers.set(OutgoingHeader.FIRST_LOGIN_OF_DAY, UserFirstLoginOfDayComposer);
            this._composers.set(OutgoingHeader.USER_HOME_ROOM, UserHomeRoomComposer);
            this._composers.set(OutgoingHeader.USER_INFO, UserInfoComposer);
            this._composers.set(OutgoingHeader.USER_PROFILE, UserProfileComposer);
            this._composers.set(OutgoingHeader.USER_SETTINGS, UserSettingsComposer);

            // INVENTORY

                // BADGE
                this._composers.set(OutgoingHeader.USER_BADGES_CURRENT, UserBadgesCurrentComposer);
                this._composers.set(OutgoingHeader.USER_BADGES, UserBadgesComposer);

                // BOT
                this._composers.set(OutgoingHeader.USER_BOT_ADD, UserBotAddComposer);
                this._composers.set(OutgoingHeader.USER_BOT_REMOVE, UserBotRemoveComposer);
                this._composers.set(OutgoingHeader.USER_BOTS, UserBotsComposer);

                // CLOTHING
                this._composers.set(OutgoingHeader.USER_CLOTHING, UserClothingComposer);
                this._composers.set(OutgoingHeader.USER_OUTFITS, UserOutfitsComposer);

                // CURRENCY
                this._composers.set(OutgoingHeader.USER_CREDITS, UserCreditsComposer);
                this._composers.set(OutgoingHeader.USER_CURRENCY, UserCurrencyComposer);

                // FURNITURE
                this._composers.set(OutgoingHeader.USER_FURNITURE_ADD, UserFurnitureAddComposer);
                this._composers.set(OutgoingHeader.USER_FURNITURE, UserFurnitureComposer);
                this._composers.set(OutgoingHeader.USER_FURNITURE_REFRESH, UserFurnitureRefreshComposer);
                this._composers.set(OutgoingHeader.USER_FURNITURE_REMOVE, UserFurnitureRemoveComposer);

                // ROOM
                this._composers.set(OutgoingHeader.USER_FAVORITE_ROOM, UserRoomFavoriteComposer);
                this._composers.set(OutgoingHeader.USER_FAVORITE_ROOM_COUNT, UserRoomFavoriteCountComposer);

                // SUBSCRIPTION
                this._composers.set(OutgoingHeader.USER_SUBSCRIPTION, UserSubscriptionComposer);

            // MESSENGER
            this._composers.set(OutgoingHeader.MESSENGER_CHAT, MessengerChatComposer);
            this._composers.set(OutgoingHeader.MESSENGER_FRIENDS, MessengerFriendsComposer);
            this._composers.set(OutgoingHeader.MESSENGER_INIT, MessengerInitComposer);
            this._composers.set(OutgoingHeader.MESSENGER_RELATIONSHIPS, MessengerRelationshipsComposer);
            this._composers.set(OutgoingHeader.MESSENGER_REQUEST, MessengerRequestComposer);
            this._composers.set(OutgoingHeader.MESSENGER_REQUESTS, MessengerRequestsComposer);
            this._composers.set(OutgoingHeader.MESSENGER_ROOM_INVITE, MessengerRoomInviteComposer);
            this._composers.set(OutgoingHeader.MESSENGER_SEARCH, MessengerSearchComposer);
            this._composers.set(OutgoingHeader.MESSENGER_UPDATE, MessengerUpdateComposer);

            // NOTIFICATION
            this._composers.set(OutgoingHeader.NOTIFICATION_LIST, NotificationListComposer);
    }

    public get events(): Map<number, Function>
    {
        return this._events;
    }

    public get composers(): Map<number, Function>
    {
        return this._composers;
    }
}