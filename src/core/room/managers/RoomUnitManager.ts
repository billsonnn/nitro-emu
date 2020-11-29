import { RoomHeightMapComposer, RoomInfoComposer, RoomModelComposer, RoomPaintComposer, RoomScoreComposer, RoomThicknessComposer, RoomUnitActionComposer, RoomUnitChatComposer, RoomUnitChatShoutComposer, RoomUnitChatWhisperComposer, RoomUnitComposer, RoomUnitDanceComposer, RoomUnitEffectComposer, RoomUnitHandItemComposer, RoomUnitIdleComposer, RoomUnitRemoveComposer, RoomUnitStatusComposer } from '../../../app';
import { NitroManager, Position } from '../../../common';
import { IMessageComposer } from '../../../networking';
import { FurnitureLogicType } from '../../furniture';
import { IUser, User } from '../../user';
import { RoomChatEnum, RoomPaintEnum } from '../enum';
import { IRoom } from '../interfaces';
import { IRoomUnitChat, IRoomUnitController, IRoomUnitHolder, RoomUnit, RoomUnitActionEnum, RoomUnitTypeEnum } from '../unit';

export class RoomUnitManager extends NitroManager
{
    private _room: IRoom;

    private _units: Map<number, IRoomUnitController>;
    private _unitCounter: number;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room          = room;

        this._units         = new Map();
        this._unitCounter   = -1;
    }

    protected onDispose(): void
    {
        this.removeAllUnits();
    }

    public getUnit(id: number): IRoomUnitController
    {
        const existing = this._units.get(id);

        if(!existing) return null;

        return existing;
    }

    public getUnitByUserId(id: number): IRoomUnitController
    {
        for(let unit of this._units.values())
        {
            if(!unit || !unit.holder) continue;

            if(!(unit.holder instanceof User)) continue;

            if(unit.holder.id !== id) continue;

            return unit;
        }

        return null;
    }

    public getUnitByUsername(username: string): IRoomUnitController
    {
        for(let unit of this._units.values())
        {
            if(!unit || !unit.holder) continue;

            if(!(unit.holder instanceof User)) continue;

            if(unit.holder.username !== username) continue;

            return unit;
        }

        return null;
    }

    public addUnit(unit: IRoomUnitController, position: Position): IRoomUnitController
    {
        if(!unit || unit.manager !== this) return null;

        const existing = this._units.get(unit.id);

        if(existing)
        {
            unit.dispose();

            return null;
        }

        unit.location.position = position;

        const tile = unit.location.getTile();

        if(tile) tile.addUnit(unit);

        unit.location.invokeCurrentLocation();

        unit.needsUpdate = false;

        this.processComposer(new RoomUnitComposer([ unit ]), new RoomUnitStatusComposer([ unit ]));

        this._units.set(unit.id, unit);

        this.updateTotalUsers();

        return unit;
    }

    public removeUnit(id: number): void
    {
        const unit = this.getUnit(id);

        if(!unit) return;

        this.processComposer(new RoomUnitRemoveComposer(unit.id));

        this._units.delete(unit.id);

        this._room.game && this._room.game.removeUnitFromTeam(unit);

        this.updateTotalUsers();

        unit.dispose();

        this._room.tryDispose();
    }

    public removeAllUnits(): void
    {
        for(let id of this._units.keys()) this.removeUnit(id);
    }

    public createUnitAndAssign(holder: IRoomUnitHolder, position: Position): IRoomUnitController
    {
        if(!holder) return null;

        const unit = new RoomUnit(++this._unitCounter, this);

        if(!unit) return null;

        if(!holder.setRoomUnit(unit) || !unit.holder) return null;

        return this.addUnit(unit, position);
    }

    public processComposer(...composers: IMessageComposer[]): void
    {
        for(let unit of this._units.values())
        {
            if(!unit || !unit.holder) continue;

            if(unit.holder instanceof User) unit.holder.processComposer(...composers);
        }
    }

    public updateUnitsAt(...positions: Position[]): void
    {
        positions = [ ...positions ];

        const units: IRoomUnitController[] = [];

        for(let position of positions)
        {
            if(!position) continue;

            const tile = this._room.map.getTile(position);

            if(!tile || !tile.units.size) continue;
            
            for(let unit of tile.units.values())
            {
                if(!unit) continue;

                unit.location && unit.location.invokeCurrentLocation();

                if(unit.needsUpdate)
                {
                    units.push(unit);

                    unit.needsUpdate = false;
                }
            }
        }

        if(!units || !units.length) return;

        this._room.unit.processComposer(new RoomUnitStatusComposer(units));
    }

    private updateTotalUsers(): void
    {
        let result = 0;

        for(let unit of this._units.values())
        {
            if(!unit) continue;

            if(unit.type !== RoomUnitTypeEnum.USER) continue;

            result++;
        }

        this._room.details.setUsersNow(result);
    }

    public enterRoom(user: IUser, position: Position = null): void
    {
        if(!user) return;

        this._room.manager.setPendingRoomId(user.id, this._room.id);

        const existing = this.getUnitByUserId(user.id);

        if(existing) existing.dispose();

        const unit = this.createUnitAndAssign(user, position ? position : this._room.model.doorPosition.copy());

        if(!unit) return;

        user.processComposer(
            new RoomHeightMapComposer(this._room),
            new RoomModelComposer(this._room),
            new RoomThicknessComposer(this._room),
            new RoomInfoComposer(this._room, false, false, this._room.security.isOwner(user)),
            new RoomScoreComposer(this._room.details.totalLikes, user.inventory.rooms.canLikeRoom(this._room))
        );

        this._room.furniture.sendAllFurniture(user);

        this._room.security.refreshRights(unit);

        const units: IRoomUnitController[]  = [];
        const composers: IMessageComposer[] = [];

        if(this._room.details.paintFloor) composers.push(new RoomPaintComposer(RoomPaintEnum.FLOOR, this._room.details.paintFloor.toString()));
        if(this._room.details.paintWall) composers.push(new RoomPaintComposer(RoomPaintEnum.WALLPAPER, this._room.details.paintWall.toString()));
        if(this._room.details.paintLandscape) composers.push(new RoomPaintComposer(RoomPaintEnum.LANDSCAPE, this._room.details.paintLandscape.toString()));

        for(let existingUnit of this._units.values())
        {
            if(!existingUnit) continue;

            units.push(existingUnit);

            const danceType     = existingUnit.location.danceType;
            const effectType    = existingUnit.location.effectType;
            const handType      = existingUnit.location.handType;
            const isIdle        = existingUnit.location.isIdle;

            if(danceType) composers.push(new RoomUnitDanceComposer(existingUnit.id, danceType));

            if(effectType) composers.push(new RoomUnitEffectComposer(existingUnit.id, effectType));

            if(handType) composers.push(new RoomUnitHandItemComposer(existingUnit.id, handType));

            if(isIdle) composers.push(new RoomUnitIdleComposer(existingUnit.id, isIdle));
        }

        user.processComposer(
            new RoomUnitComposer(units),
            new RoomUnitStatusComposer(units),
            ...composers);

        unit.ready();

        this._room.security.isMuted(user);

        this._room.manager.clearPendingRoom(user.id);

        this._room.wired && this._room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_ENTER_ROOM, user);
    }

    public chat(unit: IRoomUnitController, type: RoomChatEnum, message: string, runChecks: boolean = true): void
    {
        if(!message || !message.length) return;

        const existing = this.getUnit(unit.id);

        if(!existing || (existing !== unit)) return;

        if(message.length < 1 || message.length > 100) return;

        const chat: IRoomUnitChat = {
            unitId: unit.id,
            message,
            emotion: 0,
            bubble: 0,
            urls: []
        };

        if(runChecks)
        {
            if(unit.holder instanceof User)
            {
                if(this._room.security.isMuted(unit.holder)) return;

                chat.bubble = unit.holder.details.chatStyle;

                if(this._room.wired && this._room.wired.processTriggers(FurnitureLogicType.FURNITURE_WIRED_TRIGGER_SAYS_SOMETHING, unit.holder, chat))
                {
                    return;
                }
            }
            else if(this._room.security.isRoomMuted) return;
        }

        let receivers: IRoomUnitController[] = [];

        if(type === RoomChatEnum.WHISPER)
        {
            const username  = chat.message.substr(0, chat.message.indexOf(' ')) || null;
            const message   = chat.message.substr(chat.message.indexOf(' ') + 1) || null;

            if(!username || !message) return;
            
            const existingUnit = this.getUnitByUsername(username);

            if(!existingUnit) return;
            
            chat.message = message;
            
            receivers.push(existingUnit, unit);
        }

        let chatComposer: RoomUnitChatComposer = null;

        switch(type)
        {
            case RoomChatEnum.NORMAL:
                chatComposer = new RoomUnitChatComposer(chat);
                break;
            case RoomChatEnum.SHOUT:
                chatComposer = new RoomUnitChatShoutComposer(chat);
                break;
            case RoomChatEnum.WHISPER:
                chatComposer = new RoomUnitChatWhisperComposer(chat);
                break;
        }

        if(receivers && receivers.length)
        {
            for(let receiver of receivers)
            {
                if(!receiver) continue;

                if(receiver !== unit) receiver.location.lookAtPosition(unit.location.position, true, false);

                if(receiver.holder instanceof User)
                {
                    if(message.endsWith('o/')) receiver.holder.processComposer(new RoomUnitActionComposer(unit.id, RoomUnitActionEnum.WAVE));

                    receiver.holder.processComposer(chatComposer);
                }
            }
        }
        else
        {
            for(let existingUnit of this._units.values())
            {
                if(!existingUnit) continue;

                if((type !== RoomChatEnum.SHOUT) && !unit.location.position.isNear(existingUnit.location.position, this._room.details.chatDistance)) continue;

                if(existingUnit !== unit) existingUnit.location.lookAtPosition(unit.location.position, true, false);

                if(existingUnit.holder instanceof User)
                {
                    if(message.endsWith('o/')) existingUnit.holder.processComposer(new RoomUnitActionComposer(unit.id, RoomUnitActionEnum.WAVE));

                    existingUnit.holder.processComposer(chatComposer);
                }
            }
        }
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get units(): Map<number, IRoomUnitController>
    {
        return this._units;
    }
}