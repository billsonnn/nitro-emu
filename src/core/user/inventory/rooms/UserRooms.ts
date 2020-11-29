import { RoomScoreComposer, UserRoomFavoriteComposer } from '../../../../app';
import { NitroManager } from '../../../../common';
import { RoomRightsDao, UserFavoriteRoomDao, UserLikedRoomDao } from '../../../../database';
import { IRoom } from '../../../room';
import { IUser } from '../../interfaces';

export class UserRooms extends NitroManager
{
    public static MAX_FAVORITE_ROOMS: number = 100;
    
    private _user: IUser;

    private _favoriteRoomIds: number[];
    private _likedRoomIds: number[];
    private _rightsRoomIds: number[];

    constructor(user: IUser)
    {
        super(user.logger);

        this._user              = user;

        this._favoriteRoomIds   = [];
        this._likedRoomIds      = [];
        this._rightsRoomIds     = [];
    }

    protected async onInit(): Promise<void>
    {
        await this.loadFavoriteRooms();
        await this.loadLikedRooms();
        await this.loadRightsRooms();
    }

    protected async onDispose(): Promise<void>
    {
        this._user              = null;

        this._favoriteRoomIds   = [];
        this._likedRoomIds      = [];
    }

    public hasFavoritedRoom(roomId: number): boolean
    {
        return this._favoriteRoomIds.indexOf(roomId) !== -1;
    }

    public canFavoriteRoom(room: IRoom): boolean
    {
        if(!room) return false;

        if(this.hasLikedRoom(room.id)) return false;

        if(room.security.isStrictOwner(this._user)) return false;

        return true;
    }

    public hasLikedRoom(roomId: number): boolean
    {
        return this._likedRoomIds.indexOf(roomId) >= 0;
    }

    public canLikeRoom(room: IRoom): boolean
    {
        if(!room) return false;

        if(this.hasLikedRoom(room.id)) return false;

        if(room.security.isStrictOwner(this._user)) return false;

        return true;
    }

    public async favoriteRoom(room: IRoom): Promise<void>
    {
        if(!room) return;

        if(!this.canFavoriteRoom(room)) return;

        await UserFavoriteRoomDao.addFavoriteRoom(this._user.id, room.id);

        this._favoriteRoomIds.push(room.id);

        this._user.processComposer(new UserRoomFavoriteComposer(room.id, true));
    }

    public async removeFavoriteRoom(room: IRoom): Promise<void>
    {
        if(!room) return;

        const index = this._favoriteRoomIds.indexOf(room.id);

        if(index === -1) return;

        await UserFavoriteRoomDao.removeFavoriteRoom(this._user.id, room.id);

        this._favoriteRoomIds.splice(index, 1);

        this._user.processComposer(new UserRoomFavoriteComposer(room.id, false));
    }

    public async likeRoom(room: IRoom): Promise<void>
    {
        if(!room) return;

        if(!this.canLikeRoom(room)) return;

        await UserLikedRoomDao.addLikedRoom(this._user.id, room.id);

        this._likedRoomIds.push(room.id);

        room.details.totalLikes++;

        if(this._user.roomUnit && (this._user.roomUnit.manager.room === room)) this._user.processComposer(new RoomScoreComposer(room.details.totalLikes, false));
    }

    public async removeLikedRoom(room: IRoom): Promise<void>
    {
        if(!room) return;

        const index = this._likedRoomIds.indexOf(room.id);

        if(index === -1) return;

        await UserLikedRoomDao.removeLikedRoom(this._user.id, room.id);

        this._likedRoomIds.splice(index, 1);

        room.details.totalLikes--;

        if(this._user.roomUnit && (this._user.roomUnit.manager.room === room)) this._user.processComposer(new RoomScoreComposer(room.details.totalLikes, true));
    }

    public addRightsRoom(roomId: number): boolean
    {
        if(!roomId) return false;

        if(this.hasRightsRoom(roomId)) return;

        this._rightsRoomIds.push(roomId);
    }

    public hasRightsRoom(roomId: number): boolean
    {
        if(!roomId) return false;

        return this._rightsRoomIds.indexOf(roomId) >= 0;
    }

    public removeRightsRoom(room: IRoom): Promise<void>
    {
        if(!room) return;

        const index = this._rightsRoomIds.indexOf(room.id);

        if(index === -1) return;
        
        this._rightsRoomIds.splice(index, 1);
    }

    private async loadFavoriteRooms(): Promise<void>
    {
        this._favoriteRoomIds = [];

        const results = await UserFavoriteRoomDao.loadUserFavoriteRooms(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._favoriteRoomIds.push(result.roomId);
        }
    }

    private async loadLikedRooms(): Promise<void>
    {
        this._likedRoomIds = [];

        const results = await UserLikedRoomDao.loadUserLikedRooms(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._likedRoomIds.push(result.roomId);
        }
    }

    private async loadRightsRooms(): Promise<void>
    {
        this._likedRoomIds = [];

        const results = await RoomRightsDao.loadUserRightsRooms(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._rightsRoomIds.push(result.roomId);
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get favoriteRoomIds(): number[]
    {
        return this._favoriteRoomIds;
    }

    public get likedRoomIds(): number[]
    {
        return this._likedRoomIds;
    }
}