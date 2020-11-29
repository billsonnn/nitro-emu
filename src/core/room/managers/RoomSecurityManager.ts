import { GenericErrorComposer, RoomBanRemoveComposer, RoomDoorbellAddComposer, RoomDoorbellCloseComposer, RoomDoorbellDeniedComposer, RoomEnterErrorComposer, RoomInfoOwnerComposer, RoomMuteComposer, RoomMuteUserComposer, RoomOwnerComposer, RoomRightsComposer, RoomRightsListAddComposer, RoomRightsListComposer, RoomRightsListRemoveComposer } from '../../../app';
import { NitroManager, TimeHelper } from '../../../common';
import { RoomBanDao, RoomMuteDao, RoomRightsDao } from '../../../database';
import { IMessageComposer } from '../../../networking';
import { PermissionList } from '../../security';
import { IUser, User } from '../../user';
import { RoomBanEnum, RoomEnterErrorEnum, RoomGenericErrorEnum, RoomKickEnum, RoomMuteEnum, RoomRightsEnum } from '../enum';
import { IRoom } from '../interfaces';
import { RoomBan, RoomMute } from '../security';
import { IRoomUnitController, RoomUnitStatusEnum } from '../unit';

export class RoomSecurityManager extends NitroManager
{
    private _room: IRoom;

    private _bans: Map<number, RoomBan>;
    private _mutes: Map<number, RoomMute>;
    private _rights: Map<number, string>;

    private _pendingUsers: Map<number, IUser>;

    private _isRoomMuted: boolean;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room          = room;

        this._bans          = new Map();
        this._mutes         = new Map();
        this._rights        = new Map();

        this._pendingUsers  = new Map();

        this._isRoomMuted   = false;
    }

    protected async onInit(): Promise<void>
    {
        await this.loadBans();
        await this.loadMutes();
        await this.loadRights();
    }
    
    protected async onDispose(): Promise<void>
    {
        this.clearDoorbell();
        
        this._rights.clear();
    }

    public isOwner(user: IUser): boolean
    {
        if(!user) return false;

        if((this._room.details.ownerId !== user.id) && (!user.hasPermission(PermissionList.ANY_ROOM_OWNER))) return false;

        return true;
    }

    public isStrictOwner(user: IUser): boolean
    {
        if(!user) return false;

        if(this._room.details.ownerId !== user.id) return false;

        return true;
    }

    public hasRights(user: IUser): boolean
    {
        if(!user) return false;

        if(this.isOwner(user)) return true;

        if(user.hasPermission(PermissionList.ANY_ROOM_RIGHTS)) return true;

        const existing = this._rights.get(user.id);

        if(existing) return true;

        return false;
    }

    public async giveRights(user: IUser, userId: number): Promise<void>
    {
        if(!user || !userId) return;

        if(!this.isOwner(user)) return;

        const existing = this._rights.get(userId);

        if(existing) return;

        const offlineUser = await this._room.manager.core.user.getOfflineUserById(userId);

        if(!offlineUser) return;

        if(this.isOwner(offlineUser)) return;

        await RoomRightsDao.giveRights(this._room.id, userId);

        this._rights.set(offlineUser.id, offlineUser.details.username);

        offlineUser.inventory && offlineUser.inventory.rooms.addRightsRoom(this._room.id);

        this.ownersComposer(new RoomRightsListAddComposer(this._room.id, offlineUser.id, offlineUser.username));

        const unit = offlineUser.roomUnit;

        if(unit && (unit.manager.room === this._room)) this.refreshRights(offlineUser.roomUnit);
    }

    public async removeRights(user: IUser, ...userIds: number[]): Promise<void>
    {
        if(!user) return;

        userIds = [ ...userIds ];

        if(!this.isOwner(user))
        {
            if((userIds.length !== 1) || (userIds[0] !== user.id)) return;
        }
        
        const removedIds: number[] = [];

        for(let userId of userIds)
        {
            if(!userId) continue;

            const existing = this._rights.get(userId);

            if(!existing) continue;

            this._rights.delete(userId);

            removedIds.push(userId);

            this.ownersComposer(new RoomRightsListRemoveComposer(this._room.id, userId));

            const activeUser = this._room.manager.core.user.getUserById(userId);

            if(!activeUser) continue;

            activeUser.inventory && activeUser.inventory.rooms.removeRightsRoom(this._room);

            const unit = activeUser.roomUnit;

            if(unit && (unit.manager.room === this._room)) this.refreshRights(activeUser.roomUnit);
        }

        if(!removedIds || !removedIds.length) return;

        await RoomRightsDao.removeRights(this._room.id, ...removedIds);
    }

    public async removeAllRights(user: IUser): Promise<void>
    {
        if(!user) return;

        const userIds: number[] = [];

        for(let userId of this._rights.keys()) userIds.push(userId);

        await this.removeRights(user, ...userIds);
    }

    public async removeOwnRights(user: IUser): Promise<void>
    {
        if(!user) return;

        await this.removeRights(user, user.id);
    }

    public refreshRights(unit: IRoomUnitController): void
    {
        if(!unit) return;

        let isOwner: boolean    = false;
        let rights: number      = RoomRightsEnum.NONE;

        if(unit.holder instanceof User)
        {
            if(this.isOwner(unit.holder))
            {
                isOwner = true;
                rights  = RoomRightsEnum.MODERATOR;
            }

            else if(this.hasRights(unit.holder))
            {
                rights = RoomRightsEnum.RIGHTS;
            }

            const composers: IMessageComposer[] = [ new RoomRightsComposer(rights), new RoomInfoOwnerComposer(this._room.id, isOwner) ];

            if(isOwner) composers.push(new RoomOwnerComposer(), new RoomRightsListComposer(this._room.id, this._rights.entries()));

            unit.holder.processComposer(...composers);
        }

        unit.location && unit.location.addStatus(RoomUnitStatusEnum.FLAT_CONTROL, rights.toString());
    }

    public isBanned(user: IUser): boolean
    {
        if(!user) return false;

        if(this.isOwner(user)) return false;

        const existing = this._bans.get(user.id);

        if(!existing) return false;

        const remaining = TimeHelper.between(TimeHelper.now, existing.timestampExpires, 'seconds');

        if(remaining <= 0)
        {
            this._bans.delete(existing.userId);

            RoomBanDao.removeBan(this._room.id, existing.userId);

            return false;
        }

        return true;
    }

    public async banUser(user: IUser, userId: number, length: number): Promise<void>
    {
        if(!user || !userId || !length) return;

        const allowBan = this._room.details.allowBan;

        if((allowBan === RoomBanEnum.NONE) && !this.isOwner(user)) return;

        if((allowBan === RoomBanEnum.RIGHTS) && !this.hasRights(user)) return;

        const existing = this._bans.get(userId);

        if(existing) return;

        const offlineUser = await this._room.manager.core.user.getOfflineUserById(userId);

        if(!offlineUser) return;

        if(this.isOwner(offlineUser)) return;

        const expiration = TimeHelper.add(TimeHelper.now, length, 'minutes');

        const entity = await RoomBanDao.banUser(this._room.id, offlineUser.id, expiration);

        entity.user = offlineUser.details.entity;

        this._bans.set(offlineUser.id, new RoomBan(entity));

        const unit = offlineUser.roomUnit;

        if(unit && (unit.manager.room === this._room))
        {
            if(unit.holder instanceof User) unit.holder.processComposer(new RoomEnterErrorComposer(RoomEnterErrorEnum.BANNED));
            
            unit.dispose();
        }
    }

    public async removeBan(user: IUser, userId: number): Promise<void>
    {
        if(!user || !userId) return;

        if(!this.isOwner(user)) return;

        const existing = this._bans.get(userId);

        if(!existing) return;

        this._bans.delete(userId);

        await RoomBanDao.removeBan(this._room.id, userId);

        user.processComposer(new RoomBanRemoveComposer(this._room.id, userId));
    }

    public isMuted(user: IUser, alert: boolean = true): boolean
    {
        if(!user) return false;

        if(this.isOwner(user)) return false;

        if(this._isRoomMuted) return true;

        const existing = this._mutes.get(user.id);

        if(!existing) return false;

        const remaining = TimeHelper.between(TimeHelper.now, existing.timestampExpires, 'seconds');

        if(remaining <= 0)
        {
            this._mutes.delete(existing.userId);

            RoomMuteDao.removeMute(this._room.id, existing.userId);

            return false;
        }

        if(alert) user.processComposer(new RoomMuteUserComposer(Math.floor(remaining)));

        return true;
    }

    public async muteUser(user: IUser, userId: number, length: number): Promise<void>
    {
        if(!user || !userId || !length) return;

        const allowMute = this._room.details.allowMute;

        if((allowMute === RoomMuteEnum.NONE) && !this.isOwner(user)) return;

        if((allowMute === RoomMuteEnum.RIGHTS) && !this.hasRights(user)) return;

        const existing = this._mutes.get(userId);

        if(existing) return;

        const offlineUser = await this._room.manager.core.user.getOfflineUserById(userId);

        if(!offlineUser) return;

        if(this.isOwner(offlineUser)) return;

        const expiration = TimeHelper.add(TimeHelper.now, length, 'minutes');

        const entity = await RoomMuteDao.muteUser(this._room.id, offlineUser.id, expiration);

        entity.user = offlineUser.details.entity;

        this._mutes.set(offlineUser.id, new RoomMute(entity));

        const unit = offlineUser.roomUnit;

        if(unit && (unit.manager.room === this._room))
        {
            if(unit.holder instanceof User) unit.holder.processComposer(new RoomMuteUserComposer(length * 60));
        }
    }

    public async removeMute(user: IUser, userId: number): Promise<void>
    {
        if(!user || !userId) return;

        if(!this.isOwner(user)) return;

        const existing = this._mutes.get(userId);

        if(!existing) return;

        this._mutes.delete(userId);

        await RoomMuteDao.removeMute(this._room.id, userId);
    }

    public kickUser(user: IUser, userId: number): void
    {
        if(!user || !userId) return;

        const allowKick = this._room.details.allowKick;

        if((allowKick === RoomKickEnum.NONE) && !this.isOwner(user)) return;

        if((allowKick === RoomKickEnum.RIGHTS) && !this.hasRights(user)) return;

        const unit = this._room.unit.getUnitByUserId(userId);

        if(!unit) return;

        if(unit.holder instanceof User) unit.holder.processComposer(new GenericErrorComposer(RoomGenericErrorEnum.ROOM_KICKED));

        unit.dispose();
    }

    public muteRoom(user: IUser): void
    {
        if(!user) return;

        if(!this.isOwner(user)) return;

        this._isRoomMuted = !this._isRoomMuted;

        this.ownersComposer(new RoomMuteComposer(this.isRoomMuted));
    }

    public requestDoorbell(user: IUser): void
    {
        if(!user) return;

        const units = this._room.unit && this._room.unit.units;

        if(!units || !units.size)
        {
            user.processComposer(new RoomDoorbellDeniedComposer(null));

            return;
        }

        const tempComposer = new RoomDoorbellAddComposer(user.username);

        let found = false;

        for(let unit of units.values())
        {
            if(!unit || !unit.holder) continue;

            if(!(unit.holder instanceof User)) continue;

            if(!this.isOwner(unit.holder)) continue;

            unit.holder.processComposer(tempComposer);

            found = true;
        }

        if(!found)
        {
            user.processComposer(new RoomDoorbellDeniedComposer(null));

            return;
        }

        user.processComposer(new RoomDoorbellAddComposer(null));

        this._pendingUsers.set(user.id, user);

        this._room.manager.setPendingDoorbell(user.id, this._room.id);
    }

    public answerDoorbell(user: IUser, username: string, accepted: boolean): void
    {
        if(!user || !username) return;

        if(!this.isOwner(user)) return;

        if(!this._pendingUsers.size) return;

        for(let pendingUser of this._pendingUsers.values())
        {
            if(!pendingUser || pendingUser.username !== username) continue;

            this.removeDoorbell(pendingUser);

            if(accepted) this._room.manager.enterRoom(pendingUser, this._room.id, null, true);
            else pendingUser.processComposer(new RoomDoorbellDeniedComposer(null));

            return;
        }
    }

    public removeDoorbell(user: IUser): void
    {
        if(!user) return;

        const existing = this._pendingUsers.get(user.id);

        if(!existing || (existing !== user)) return;

        this._pendingUsers.delete(user.id);

        this._room.manager.clearPendingDoorbell(user);

        this.ownersComposer(new RoomDoorbellCloseComposer(user.username));
    }

    public clearDoorbell(): void
    {
        if(!this._pendingUsers.size) return;

        for(let pendingUser of this._pendingUsers.values())
        {
            if(!pendingUser) continue;

            this._pendingUsers.delete(pendingUser.id);

            this._room.manager.clearPendingDoorbell(pendingUser);

            this.ownersComposer(new RoomDoorbellCloseComposer(pendingUser.username));
            
            pendingUser.processComposer(new RoomDoorbellDeniedComposer(null));
        }
    }

    public ownersComposer(...composers: IMessageComposer[]): void
    {
        const units = this._room.unit.units;

        if(!units) return;

        for(let unit of units.values())
        {
            if(!unit || !unit.holder) continue;

            if(!(unit.holder instanceof User)) continue;

            if(!this.isOwner(unit.holder)) continue;

            unit.holder.processComposer(...composers);
        }
    }

    public rightsComposer(...composers: IMessageComposer[]): void
    {
        const units = this._room.unit.units;

        if(!units) return;

        for(let unit of units.values())
        {
            if(!unit || !unit.holder) continue;

            if(!(unit.holder instanceof User)) continue;

            if(!this.hasRights(unit.holder)) continue;

            unit.holder.processComposer(...composers);
        }
    }

    private async loadBans(): Promise<void>
    {
        this._bans.clear();

        const results = await RoomBanDao.loadBans(this._room.id);

        if(!results) return;
        
        const removedBans: number[] = [];

        for(let result of results)
        {
            if(!result) continue;

            const remaining = TimeHelper.between(TimeHelper.now, result.timestampExpires, 'seconds');

            if(remaining <= 0)
            {
                removedBans.push(result.userId);

                continue;
            }

            this._bans.set(result.user.id, new RoomBan(result));
        }

        if(!removedBans || !removedBans.length) return;

        RoomBanDao.removeBan(this._room.id, ...removedBans);
    }

    private async loadMutes(): Promise<void>
    {
        this._mutes.clear();

        const results = await RoomMuteDao.loadMutes(this._room.id);

        if(!results) return;
        
        const removedMutes: number[] = [];

        for(let result of results)
        {
            if(!result) continue;

            const remaining = TimeHelper.between(TimeHelper.now, result.timestampExpires, 'seconds');

            if(remaining <= 0)
            {
                removedMutes.push(result.userId);

                continue;
            }

            this._mutes.set(result.user.id, new RoomMute(result));
        }

        if(!removedMutes || !removedMutes.length) return;

        RoomMuteDao.removeMute(this._room.id, ...removedMutes);
    }

    private async loadRights(): Promise<void>
    {
        this._rights.clear();

        const results = await RoomRightsDao.loadRights(this._room.id);

        if(!results) return;
        
        for(let result of results)
        {
            if(!result) continue;

            this._rights.set(result.user.id, result.user.username);
        }
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get bans(): Map<number, RoomBan>
    {
        return this._bans;
    }

    public get mutes(): Map<number, RoomMute>
    {
        return this._mutes;
    }

    public get rights(): Map<number, string>
    {
        return this._rights;
    }

    public get isRoomMuted(): boolean
    {
        return this._isRoomMuted;
    }
}