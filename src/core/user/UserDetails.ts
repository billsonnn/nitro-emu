import { RoomUnitInfoComposer, UserFigureComposer } from '../../app';
import { TimeHelper } from '../../common';
import { UserEntity } from '../../database';
import { IUser, IUserNavigatorSettings, IUserSettings } from './interfaces';

export class UserDetails
{
    private _user: IUser;
    private _entity: UserEntity;

    private _firstLoginOfDay: boolean;

    constructor(user: IUser, entity: UserEntity)
    {
        if(!user) throw new Error('invalid_user');
        
        if(!(entity instanceof UserEntity)) throw new Error('invalid_entity');

        this._user              = user;
        this._entity            = entity;

        this._firstLoginOfDay   = false;
    }

    public save(): void
    {
        this._user.manager.core.database.queue.queueEntity(this._entity);
        
        return;
    }

    public async saveNow(): Promise<void>
    {
        await this._user.manager.core.database.queue.processNow(this._entity);
    }

    public updateOnline(flag: boolean): void
    {
        if(flag)
        {
            this._entity.online     = 1;
            this._entity.lastOnline = TimeHelper.now;

            if(this._entity.statistics.loginStreakLast)
            {
                if(TimeHelper.isNextDay(TimeHelper.now, this._entity.statistics.loginStreakLast))
                {
                    this._firstLoginOfDay = true;

                    this._entity.statistics.loginStreak++;
                }
                
                else if(!TimeHelper.isToday(this._entity.statistics.loginStreakLast))
                {
                    this._firstLoginOfDay = true;

                    this._entity.statistics.loginStreak = 1;
                }
            }
            else
            {
                this._firstLoginOfDay = true;

                this._entity.statistics.loginStreak = 1;
            }

            this._entity.statistics.loginStreakLast = TimeHelper.now;

            this._entity.statistics.totalLogins++;
        }
        else
        {
            this._entity.online = 0;

            if(this._entity.statistics.loginStreakLast)
            {
                const daysBetween = TimeHelper.between(this._entity.statistics.loginStreakLast, TimeHelper.now, 'days');

                if(daysBetween > 0) this._entity.statistics.loginStreak += daysBetween;

                this._entity.statistics.totalSecondsOnline += TimeHelper.between(this._entity.statistics.loginStreakLast, TimeHelper.now, 'seconds');
            }
        }

        if(this._entity.statistics.loginStreak > this._entity.statistics.loginStreakLifetime) this._entity.statistics.loginStreakLifetime = this._entity.statistics.loginStreak;

        this.save();

        if(this._user.messenger) this._user.messenger.updateAllFriends();
    }

    public updateFigure(figure: string, gender: string): void
    {
        if(!figure) return;

        // if(!this._user.hasPermission(PermissionList.ALLOW_ANY_FIGURE))
        // {
        //     if(!FigureHelper.validateFigure(figure, Nitro.gameManager.catalogManager.clothingIds, this._user.inventory.clothing.clothingIds)) return;
        // }
        
        this._entity.figure = figure;
        this._entity.gender = gender === 'F' ? 'F' : 'M';

        this.save();

        this._user.processComposer(new UserFigureComposer(this._entity.figure, this._entity.gender));

        if(this._user.roomUnit) this._user.roomUnit.manager.processComposer(new RoomUnitInfoComposer(this._user.roomUnit));

        if(this._user.messenger) this._user.messenger.updateAllFriends();
    }

    public updateMotto(motto: string): void
    {
        this._entity.motto = motto || '';
        
        this.save();

        if(this._user.roomUnit) this._user.roomUnit.manager.processComposer(new RoomUnitInfoComposer(this._user.roomUnit));
    }

    public updateChatStyle(style: number): void
    {
        this._entity.info.chatStyle = style || 0;

        this.save();
    }

    public updateNavigator(settings: IUserNavigatorSettings): void
    {
        this._entity.info.navigatorX            = settings.x || 100;
        this._entity.info.navigatorY            = settings.y || 100;
        this._entity.info.navigatorWidth        = settings.width || 435;
        this._entity.info.navigatorHeight       = settings.height || 535;
        this._entity.info.navigatorSearchOpen   = settings.searchOpen ? 1 : 0;

        this.save();
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get entity(): UserEntity
    {
        return this._entity;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get username(): string
    {
        return this._entity.username;
    }

    public get motto(): string
    {
        return this._entity.motto || '';
    }

    public get gender(): string
    {
        return this._entity.gender;
    }

    public get figure(): string
    {
        return this._entity.figure;
    }

    public set figure(figure: string)
    {
        this._entity.figure = figure;

        this.save();
    }

    public get rankId(): number
    {
        return this._entity.rankId || 0;
    }

    public set rankId(id: number)
    {
        this._entity.rankId = id;

        this.save();
    }

    public get online(): boolean
    {
        return this._entity.online === 1;
    }

    public set online(flag: boolean)
    {
        this._entity.online = flag ? 1 : 0;

        this.save();
    }

    public get lastOnline(): Date
    {
        return this._entity.lastOnline;
    }

    public set lastOnline(date: Date)
    {
        this._entity.lastOnline = date;

        this.save();
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }

    public get homeRoom(): number
    {
        return this._entity.info.homeRoom || 0;
    }

    public set homeRoom(roomId: number)
    {
        this._entity.info.homeRoom = roomId;

        this.save();
    }

    public get respectsReceived(): number
    {
        return this._entity.info.respectsReceived || 0;
    }

    public get respectsRemaining(): number
    {
        return this._entity.info.respectsRemaining || 0;
    }

    public get respectsPetRemaining(): number
    {
        return this._entity.info.respectsPetRemaining || 0;
    }

    public get achievementScore(): number
    {
        return this._entity.info.achievementScore || 0;
    }

    public get friendRequestsDisabled(): boolean
    {
        return this._entity.info.friendRequestsDisabled === 1;
    }

    public get toolbarToggles(): boolean
    {
        return this._entity.info.toolbarToggles === 1;
    }

    public get volumeFurni(): number
    {
        return this._entity.info.volumeFurni || 0;
    }

    public set volumeFurni(volume: number)
    {
        this._entity.info.volumeFurni = volume;

        this.save();
    }

    public get volumeSystem(): number
    {
        return this._entity.info.volumeSystem || 0;
    }

    public set volumeSystem(volume: number)
    {
        this._entity.info.volumeSystem = volume;

        this.save();
    }

    public get volumeTrax(): number
    {
        return this._entity.info.volumeTrax || 0;
    }

    public set volumeTrax(volume: number)
    {
        this._entity.info.volumeTrax = volume;

        this.save();
    }

    public get oldChat(): boolean
    {
        return this._entity.info.oldChat === 1;
    }

    public set oldChat(flag: boolean)
    {
        this._entity.info.oldChat = flag ? 1 : 0;

        this.save();
    }

    public get ignoreInvites(): boolean
    {
        return this._entity.info.ignoreInvites === 1;
    }

    public set ignoreInvites(flag: boolean)
    {
        this._entity.info.ignoreInvites = flag ? 1 : 0;

        this.save();
    }

    public get cameraFocus(): boolean
    {
        return this._entity.info.cameraFocus === 1;
    }

    public set cameraFocus(flag: boolean)
    {
        this._entity.info.cameraFocus = flag ? 1 : 0;

        this.save();
    }

    public get chatStyle(): number
    {
        return this._entity.info.chatStyle || 0;
    }

    public get navigatorX(): number
    {
        return this._entity.info.navigatorX;
    }

    public get navigatorY(): number
    {
        return this._entity.info.navigatorY;
    }

    public get navigatorWidth(): number
    {
        return this._entity.info.navigatorWidth;
    }

    public get navigatorHeight(): number
    {
        return this._entity.info.navigatorHeight;
    }

    public get navigatorSearchOpen(): boolean
    {
        return this._entity.info.navigatorSearchOpen === 1;
    }

    public get settings(): IUserSettings
    {
        return {
            volumeFurni: this.volumeFurni,
            volumeSystem: this.volumeSystem,
            volumeTrax: this.volumeTrax,
            oldChat: this.oldChat,
            blockRoomInvites: this.ignoreInvites,
            cameraFollow: this.cameraFocus,
            toggles: this.toolbarToggles ? 1 : 0,
            chatStyle: this.chatStyle
        };
    }

    public get navigatorSettings(): IUserNavigatorSettings
    {
        return {
            x: this._entity.info.navigatorX,
            y: this._entity.info.navigatorY,
            width: this._entity.info.navigatorWidth,
            height: this._entity.info.navigatorHeight,
            searchOpen: this._entity.info.navigatorSearchOpen === 1
        };
    }

    public get totalFriends(): number
    {
        //@ts-ignore
        return this.entity.totalFriends || 0;
    }

    public get firstLoginOfDay(): boolean
    {
        return this._firstLoginOfDay;
    }
}