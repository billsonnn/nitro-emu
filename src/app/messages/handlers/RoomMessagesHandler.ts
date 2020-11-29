import { Position } from '../../../common';
import { FurnitureDiceLogic, FurnitureExchangeLogic, FurnitureStackHelperLogic, FurnitureWiredLogic, RoomChatEnum } from '../../../core';
import { IMessageHandler, MessageHandler } from '../../../networking';
import { FurnitureDiceOpenEvent, FurnitureExchangeEvent, FurnitureFloorUpdateEvent, FurnitureMultiStateEvent, FurniturePickupEvent, FurnitureStackHelperEvent, FurnitureWiredSaveActionEvent, FurnitureWiredSaveConditionEvent, FurnitureWiredSaveEvent, FurnitureWiredSaveTriggerEvent, RoomBanGiveEvent, RoomBanListEvent, RoomBanRemoveEvent, RoomCreateEvent, RoomDeleteEvent, RoomDoorbellEvent, RoomEnterEvent, RoomInfoEvent, RoomKickEvent, RoomModel2Event, RoomModelEvent, RoomMuteEvent, RoomMuteUserEvent, RoomRightsGiveEvent, RoomRightsListEvent, RoomRightsRemoveAllEvent, RoomRightsRemoveEvent, RoomRightsRemoveOwnEvent, RoomSettingsEvent, RoomSettingsSaveEvent, RoomUnitActionEvent, RoomUnitChatEvent, RoomUnitChatShoutEvent, RoomUnitChatWhisperEvent, RoomUnitDanceEvent, RoomUnitLookEvent, RoomUnitSignEvent, RoomUnitSitEvent, RoomUnitTypingStartEvent, RoomUnitTypingStopEvent, RoomUnitWalkEvent } from '../incoming';
import { FurniturePlaceEvent } from '../incoming/room/furniture/FurniturePlaceEvent';
import { FurnitureDiceCloseEvent } from '../incoming/room/furniture/logic/FurnitureDiceCloseEvent';
import { RoomBanListComposer, RoomInfoComposer, RoomRightsListComposer, RoomSettingsComposer, RoomUnitTypingComposer } from '../outgoing';

export class RoomMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new RoomCreateEvent(this.onRoomCreateEvent.bind(this)));
        this.registerEvent(new RoomDeleteEvent(this.onRoomDeleteEvent.bind(this)));
        this.registerEvent(new RoomBanGiveEvent(this.onRoomBanGiveEvent.bind(this)));
        this.registerEvent(new RoomBanListEvent(this.onRoomBanListEvent.bind(this)));
        this.registerEvent(new RoomBanRemoveEvent(this.onRoomBanRemoveEvent.bind(this)));
        this.registerEvent(new RoomMuteEvent(this.onRoomMuteEvent.bind(this)));
        this.registerEvent(new RoomMuteUserEvent(this.onRoomMuteUserEvent.bind(this)));
        this.registerEvent(new RoomRightsGiveEvent(this.onRoomRightsGiveEvent.bind(this)));
        this.registerEvent(new RoomRightsListEvent(this.onRoomRightsListEvent.bind(this)));
        this.registerEvent(new RoomRightsRemoveAllEvent(this.onRoomRightsRemoveAllEvent.bind(this)));
        this.registerEvent(new RoomRightsRemoveEvent(this.onRoomRightsRemoveEvent.bind(this)));
        this.registerEvent(new RoomRightsRemoveOwnEvent(this.onRoomRightsRemoveOwnEvent.bind(this)));
        this.registerEvent(new RoomDoorbellEvent(this.onRoomDoorbellEvent.bind(this)));
        this.registerEvent(new RoomEnterEvent(this.onRoomEnterEvent.bind(this)));
        this.registerEvent(new RoomKickEvent(this.onRoomKickEvent.bind(this)));
        this.registerEvent(new RoomInfoEvent(this.onRoomInfoEvent.bind(this)));
        this.registerEvent(new RoomSettingsEvent(this.onRoomSettingsEvent.bind(this)));
        this.registerEvent(new RoomSettingsSaveEvent(this.onRoomSettingsSaveEvent.bind(this)));
        this.registerEvent(new FurniturePickupEvent(this.onFurniturePickupEvent.bind(this)));
        this.registerEvent(new FurniturePlaceEvent(this.onFurniturePlaceEvent.bind(this)));
        this.registerEvent(new FurnitureFloorUpdateEvent(this.onFurnitureFloorUpdateEvent.bind(this)));
        this.registerEvent(new FurnitureDiceCloseEvent(this.onFurnitureDiceCloseEvent.bind(this)));
        this.registerEvent(new FurnitureDiceOpenEvent(this.onFurnitureDiceOpenEvent.bind(this)));
        this.registerEvent(new FurnitureExchangeEvent(this.onFurnitureExchangeEvent.bind(this)));
        this.registerEvent(new FurnitureMultiStateEvent(this.onFurnitureMultiStateEvent.bind(this)));
        this.registerEvent(new FurnitureStackHelperEvent(this.onFurnitureStackHelperEvent.bind(this)));
        this.registerEvent(new FurnitureWiredSaveActionEvent(this.onFurnitureWiredSaveEvent.bind(this)));
        this.registerEvent(new FurnitureWiredSaveConditionEvent(this.onFurnitureWiredSaveEvent.bind(this)));
        this.registerEvent(new FurnitureWiredSaveTriggerEvent(this.onFurnitureWiredSaveEvent.bind(this)));
        this.registerEvent(new RoomModel2Event(this.onRoomModelEvent.bind(this)));
        this.registerEvent(new RoomModelEvent(this.onRoomModelEvent.bind(this)));
        this.registerEvent(new RoomUnitChatEvent(this.onRoomUnitChatEvent.bind(this)));
        this.registerEvent(new RoomUnitChatShoutEvent(this.onRoomUnitChatEvent.bind(this)));
        this.registerEvent(new RoomUnitChatWhisperEvent(this.onRoomUnitChatEvent.bind(this)));
        this.registerEvent(new RoomUnitTypingStartEvent(this.onRoomUnitTypingStartEvent.bind(this)));
        this.registerEvent(new RoomUnitTypingStopEvent(this.onRoomUnitTypingStopEvent.bind(this)));
        this.registerEvent(new RoomUnitActionEvent(this.onRoomUnitActionEvent.bind(this)));
        this.registerEvent(new RoomUnitDanceEvent(this.onRoomUnitDanceEvent.bind(this)));
        this.registerEvent(new RoomUnitLookEvent(this.onRoomUnitLookEvent.bind(this)));
        this.registerEvent(new RoomUnitSignEvent(this.onRoomUnitSignEvent.bind(this)));
        this.registerEvent(new RoomUnitSitEvent(this.onRoomUnitSitEvent.bind(this)));
        this.registerEvent(new RoomUnitWalkEvent(this.onRoomUnitWalkEvent.bind(this)));
    }

    private onRoomCreateEvent(event: RoomCreateEvent): Promise<void>
    {
        if(!(event instanceof RoomCreateEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        this.instance.core.room.createRoom(user, event.getParser());
    }

    private onRoomDeleteEvent(event: RoomDeleteEvent): Promise<void>
    {
        if(!(event instanceof RoomDeleteEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        this.instance.core.room.deleteRoom(user, event.getParser().roomId);
    }

    private async onRoomBanGiveEvent(event: RoomBanGiveEvent): Promise<void>
    {
        if(!(event instanceof RoomBanGiveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        await room.security.init();

        let length = 0;

        switch(event.getParser().length)
        {
            case 'RWUAM_BAN_USER_HOUR':
                length = 60;
                break;
            case 'RWUAM_BAN_USER_DAY':
                length = 1440;
                break;
            case 'RWUAM_BAN_USER_PERM':
                length = 2628000;
                break;
        }

        room.security.banUser(user, event.getParser().userId, length);
    }

    private async onRoomBanListEvent(event: RoomBanListEvent): Promise<void>
    {
        if(!(event instanceof RoomBanListEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        await room.security.init();

        if(!room.security.isOwner(user)) return;

        if(!room.security.bans.size) return;

        user.processComposer(new RoomBanListComposer(room.id, room.security.bans.values()))
    }

    private onRoomMuteEvent(event: RoomMuteEvent): Promise<void>
    {
        if(!(event instanceof RoomMuteEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.muteRoom(user);
    }

    private async onRoomMuteUserEvent(event: RoomMuteUserEvent): Promise<void>
    {
        if(!(event instanceof RoomMuteUserEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        room.security.muteUser(user, event.getParser().userId, event.getParser().minutes);
    }

    private async onRoomBanRemoveEvent(event: RoomBanRemoveEvent): Promise<void>
    {
        if(!(event instanceof RoomBanRemoveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        await room.security.init();

        room.security.removeBan(user, event.getParser().userId);
    }

    private onRoomRightsGiveEvent(event: RoomRightsGiveEvent): Promise<void>
    {
        if(!(event instanceof RoomRightsGiveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.giveRights(user, event.getParser().userId);
    }

    private onRoomRightsListEvent(event: RoomRightsListEvent): Promise<void>
    {
        if(!(event instanceof RoomRightsListEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        if(!room.security.hasRights(user)) return;

        user.processComposer(new RoomRightsListComposer(room.id, room.security.rights.entries()));
    }

    private onRoomRightsRemoveAllEvent(event: RoomRightsRemoveAllEvent): Promise<void>
    {
        if(!(event instanceof RoomRightsRemoveAllEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.removeAllRights(user);
    }

    private onRoomRightsRemoveEvent(event: RoomRightsRemoveEvent): Promise<void>
    {
        if(!(event instanceof RoomRightsRemoveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.removeRights(user, ...event.getParser().ids);
    }

    private onRoomRightsRemoveOwnEvent(event: RoomRightsRemoveOwnEvent): Promise<void>
    {
        if(!(event instanceof RoomRightsRemoveOwnEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.removeOwnRights(user);
    }

    private onRoomDoorbellEvent(event: RoomDoorbellEvent): Promise<void>
    {
        if(!(event instanceof RoomDoorbellEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.answerDoorbell(user, event.getParser().username, event.getParser().accepted);
    }

    private onRoomEnterEvent(event: RoomEnterEvent): Promise<void>
    {
        if(!(event instanceof RoomEnterEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        this.instance.core.room.enterRoom(user, event.getParser().roomId, event.getParser().password);
    }

    private onRoomKickEvent(event: RoomKickEvent): Promise<void>
    {
        if(!(event instanceof RoomKickEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.security.kickUser(user, event.getParser().userId);
    }

    private async onRoomInfoEvent(event: RoomInfoEvent): Promise<void>
    {
        if(!(event instanceof RoomInfoEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        event.connection.processComposer(new RoomInfoComposer(room, event.getParser().enterRoom, event.getParser().forwardRoom, room.security.isOwner(user)));
    }

    private async onRoomSettingsEvent(event: RoomSettingsEvent): Promise<void>
    {
        if(!(event instanceof RoomSettingsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        event.connection.processComposer(new RoomSettingsComposer(room));
    }

    private async onRoomSettingsSaveEvent(event: RoomSettingsSaveEvent): Promise<void>
    {
        if(!(event instanceof RoomSettingsSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = await this.instance.core.room.getRoom(event.getParser().roomId);

        if(!room) return;

        room.details.saveSettings(user, event.getParser());
    }

    private onFurniturePickupEvent(event: FurniturePickupEvent): void
    {
        if(!(event instanceof FurniturePickupEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.furniture.removeFurniture(user, event.getParser().itemId);
    }

    private onFurniturePlaceEvent(event: FurniturePlaceEvent): void
    {
        if(!(event instanceof FurniturePlaceEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const position = new Position(event.getParser().x, event.getParser().y, 0, event.getParser().direction);

        room.furniture.addFurniture(user, event.getParser().itemId, position);
    }

    private onFurnitureFloorUpdateEvent(event: FurnitureFloorUpdateEvent): Promise<void>
    {
        if(!(event instanceof FurnitureFloorUpdateEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const position = new Position(event.getParser().x, event.getParser().y, 0, event.getParser().direction);

        room.furniture.moveFurniture(user, event.getParser().itemId, position);
    }

    private onFurnitureDiceCloseEvent(event: FurnitureDiceCloseEvent): Promise<void>
    {
        if(!(event instanceof FurnitureDiceCloseEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture) return;

        const logic = furniture.logic as FurnitureDiceLogic;

        logic.closeDice(user);
    }

    private onFurnitureDiceOpenEvent(event: FurnitureDiceOpenEvent): Promise<void>
    {
        if(!(event instanceof FurnitureDiceOpenEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture) return;

        const logic = furniture.logic as FurnitureDiceLogic;

        logic.openDice(user);
    }

    private onFurnitureExchangeEvent(event: FurnitureExchangeEvent): Promise<void>
    {
        if(!(event instanceof FurnitureExchangeEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture) return;

        const logic = furniture.logic as FurnitureExchangeLogic;

        logic.exchange(user);
    }

    private onFurnitureMultiStateEvent(event: FurnitureMultiStateEvent): Promise<void>
    {
        if(!(event instanceof FurnitureMultiStateEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture) return;

        furniture.logic.onInteract(user, event.getParser().state);
    }

    private onFurnitureStackHelperEvent(event: FurnitureStackHelperEvent): Promise<void>
    {
        if(!(event instanceof FurnitureStackHelperEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture) return;

        if(!(furniture.logic instanceof FurnitureStackHelperLogic)) return;

        furniture.logic.setStackHelperHeight(user, event.getParser().stackHeight);
    }

    private onFurnitureWiredSaveEvent(event: FurnitureWiredSaveEvent): Promise<void>
    {
        if(!(event instanceof FurnitureWiredSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        const furniture = room.furniture.getFurniture(event.getParser().itemId);

        if(!furniture || !(furniture.logic instanceof FurnitureWiredLogic)) return;
        
        const wiredData = furniture.logic.createWiredData();

        if(!wiredData || !wiredData.initializeFromIncomingMessage(event)) return;

        furniture.logic.saveWiredData(user, wiredData);
    }

    private onRoomModelEvent(event: RoomModelEvent): Promise<void>
    {
        if(!(event instanceof RoomModelEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
        
        this.instance.core.room.continueEntering(user);
    }

    private async onRoomUnitChatEvent(event: RoomUnitChatEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitChatEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        if(await this.instance.core.command.processMessageAsCommand(user, event.getParser().message)) return;

        const unit = user.roomUnit;

        if(!unit) return;

        const type: number = event instanceof RoomUnitChatWhisperEvent ? RoomChatEnum.WHISPER : (event instanceof RoomUnitChatShoutEvent ? RoomChatEnum.SHOUT : RoomChatEnum.NORMAL);

        unit.chat(type, event.getParser().message);
    }

    private onRoomUnitTypingStartEvent(event: RoomUnitTypingStartEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitTypingStartEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.unit.processComposer(new RoomUnitTypingComposer(user.roomUnit.id, true));
    }

    private onRoomUnitTypingStopEvent(event: RoomUnitTypingStopEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitTypingStopEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const room = user.roomUnit && user.roomUnit.manager.room;

        if(!room) return;

        room.unit.processComposer(new RoomUnitTypingComposer(user.roomUnit.id, false));
    }

    private onRoomUnitActionEvent(event: RoomUnitActionEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitActionEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.action(event.getParser().actionType);
    }

    private onRoomUnitDanceEvent(event: RoomUnitDanceEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitDanceEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.dance(event.getParser().danceType);
    }

    private onRoomUnitLookEvent(event: RoomUnitLookEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitLookEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.lookAtPosition(new Position(event.getParser().x, event.getParser().y), false);
    }

    private onRoomUnitSignEvent(event: RoomUnitSignEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitSignEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.sign(event.getParser().signType);
    }

    private onRoomUnitSitEvent(event: RoomUnitSitEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitSitEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.sit();
    }

    private onRoomUnitWalkEvent(event: RoomUnitWalkEvent): Promise<void>
    {
        if(!(event instanceof RoomUnitWalkEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const unit = user.roomUnit;

        if(!unit) return;

        unit.location.walkTo(new Position(event.getParser().x, event.getParser().y));
    }
}