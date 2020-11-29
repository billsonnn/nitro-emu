import { NavigatorSearchDao, RoomEntity } from '../../../database';
import { RoomStateEnum } from '../../room';
import { IUser } from '../../user';
import { NavigatorCategory } from '../NavigatorCategory';
import { NavigatorManager } from '../NavigatorManager';
import { NavigatorTab } from '../NavigatorTab';
import { NavigatorSearchResultRoom } from './NavigatorSearchResultRoom';

export class NavigatorSearchResult
{
    private _manager: NavigatorManager;
    private _user: IUser;

    private _tab: NavigatorTab;
    private _query: string;
    private _action: number;

    private _resultQuery: string;
    private _resultName: string;

    private _rooms: NavigatorSearchResultRoom[];

    constructor(manager: NavigatorManager, user: IUser, tab: NavigatorTab, query: string, action: number = 0)
    {
        if(!manager) throw new Error('invalid_manager');

        if(!user) throw new Error('invalid_user');

        if(!tab) throw new Error('invalid_tab');

        this._manager       = manager;
        this._user          = user;

        this._tab           = tab;
        this._query         = query;
        this._action        = action;

        this._resultQuery   = null;
        this._resultName    = null;

        this._rooms   = [];
    }

    public async loadResults(): Promise<void>
    {
        let [ action, value, name ] = this._query.split(':');

        if(!value) [ action, value ] = [ 'anything', (action || null) ];

        switch(action)
        {
            case 'category':
                const category = this._manager.getCategory(parseInt(value));

                if(category)
                {
                    await this.searchByCategory(category);

                    this._resultQuery   = `category:${ value }`;
                    this._resultName    = name || `Category: ${ value }`;
                }

                break;
            case 'owner':
                await this.searchByOwner(value);

                this._resultQuery   = `owner:${ value }`;
                this._resultName    = name || `Owner Name: ${ value }`;

                break;
            case 'roomname':
                await this.searchByRoomName(value);

                this._resultQuery   = `roomname:${ value }`;
                this._resultName    = name || `Room Name: ${ value }`;

                break;
            default:
                await this.searchByAnything(value);

                this._resultQuery   = `anything:${ value }`;
                this._resultName    = name || `Text Search: ${ value }`;

                break;
        }
    }

    private addResult(entity: RoomEntity): void
    {
        if(!entity) return;

        const result = new NavigatorSearchResultRoom(entity);

        if(!result) return;

        if(result.state === RoomStateEnum.INVISIBLE)
        {
            if(result.ownerId !== this._user.id)
            {
                if(!this._user.inventory.rooms.hasRightsRoom(result.id)) return;
            }
        }

        const category = this._manager.getCategory(result.categoryId);

        if(!category) return;

        if(category.isPublic) result.isPublic = true;

        this._rooms.push(result);
    }

    private async searchByCategory(category: NavigatorCategory): Promise<void>
    {
        if(!category) return;

        const entities = await NavigatorSearchDao.findRoomsByCategory(category.id, 10);

        if(!entities) return;

        for(let entity of entities)
        {
            if(!entity) continue;

            this.addResult(entity);
        }
    }

    private async searchByOwner(search: string): Promise<void>
    {
        if(!search) return;

        const entities = await NavigatorSearchDao.findRoomsByOwner(search, this._tab.categoryIds, 50);

        if(!entities) return;

        for(let entity of entities)
        {
            if(!entity) continue;

            this.addResult(entity);
        }
    }

    private async searchByRoomName(search: string): Promise<void>
    {
        if(!search) return;

        const entities = await NavigatorSearchDao.findRoomsByName(search, this._tab.categoryIds, 10);

        if(!entities) return;

        for(let entity of entities)
        {
            if(!entity) continue;

            this.addResult(entity);
        }
    }

    private async searchByAnything(search: string): Promise<void>
    {
        if(!search) return;

        const entities = await NavigatorSearchDao.findRoomsByAnything(search, this._tab.categoryIds, 10);

        if(!entities) return;

        for(let entity of entities)
        {
            if(!entity) continue;

            this.addResult(entity);
        }
    }

    public get manager(): NavigatorManager
    {
        return this._manager;
    }

    public get tab(): NavigatorTab
    {
        return this._tab;
    }

    public get query(): string
    {
        return this._query;
    }

    public get action(): number
    {
        return this._action;
    }

    public get resultQuery(): string
    {
        return this._resultQuery;
    }

    public get resultName(): string
    {
        return this._resultName;
    }

    public get rooms(): NavigatorSearchResultRoom[]
    {
        return this._rooms;
    }
}