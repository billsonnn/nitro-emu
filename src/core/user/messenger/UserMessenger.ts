import { MessengerChatComposer, MessengerRequestComposer, MessengerRoomInviteComposer, MessengerUpdateComposer } from '../../../app';
import { NitroManager } from '../../../common';
import { MessengerDao, MessengerRequestEntity } from '../../../database';
import { IUser } from '../interfaces';
import { MessengerCategory } from './MessengerCategory';
import { MessengerFriend } from './MessengerFriend';
import { MessengerRequest } from './MessengerRequest';
import { MessengerUpdate } from './MessengerUpdate';

export class UserMessenger extends NitroManager
{
    private static ALLOWED_RELATIONSHIPS: number[] = [ 0, 1, 2, 3 ];

    private _user: IUser;

    private _categories: Map<number, MessengerCategory>;
    private _friends: Map<number, MessengerFriend>;
    private _requests: Map<number, MessengerRequest>;
    private _requestsSent: number[];

    private _update: MessengerUpdate;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user = user;

        this._categories    = new Map();
        this._friends       = new Map();
        this._requests      = new Map();
        this._requestsSent  = [];

        this._update        = new MessengerUpdate();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadCategories();
        await this.loadFriends();
        await this.loadRequests();
        await this.loadRequestsSent();
    }

    protected async onDispose(): Promise<void>
    {
        this._requestsSent = [];

        this._requests.clear();
        this._friends.clear();
        this._categories.clear();
    }

    public getFriend(id: number): MessengerFriend
    {
        if(!id) return null;

        const existing = this._friends.get(id);

        if(!existing) return null;

        return existing;
    }

    public getRequest(id: number): MessengerRequest
    {
        if(!id) return null;

        const existing = this._requests.get(id);

        if(!existing) return null;

        return existing;
    }

    public didRequest(id: number): boolean
    {
        if(!id) return false;

        if(this._requestsSent.indexOf(id) === -1) return false;

        return true;
    }

    public updateFriend(user: IUser, commit: boolean = true): void
    {
        if(!user) return;

        const friend = this.getFriend(user.id);

        if(!friend) return;

        friend.username = user.details.username;
        friend.motto    = user.details.motto;
        friend.gender   = user.details.gender;
        friend.figure   = user.details.figure;
        friend.online   = user.details.online;
        friend.inRoom   = user.roomUnit !== null;

        if(commit)
        {
            this._update.updateFriend(friend);

            this.commitUpdates();
        }
    }

    public updateAllFriends(): void
    {
        for(let friend of this._friends.values())
        {
            if(!friend || !friend.online) continue;

            const user = this._user.manager.getUserById(friend.id);

            if(!user || !user.messenger) continue;

            user.messenger.updateFriend(this._user);
        }
    }

    public updateRelationship(id: number, relationship: number): void
    {
        if(UserMessenger.ALLOWED_RELATIONSHIPS.indexOf(relationship) === -1) return;

        if(!id) return;

        const friend = this.getFriend(id);

        if(!friend) return;

        friend.relationship = relationship;

        MessengerDao.updateRelationship(this._user.id, friend.id, friend.relationship);

        this._update.updateFriend(friend);

        this.commitUpdates();
    }

    private async addFriend(user: IUser): Promise<void>
    {
        if(!user) return;

        const entity = await MessengerDao.addFriend(this._user.id, user.id);

        entity.friend = user.details.entity;

        const friend = new MessengerFriend(entity);

        if(!friend) return;

        this._friends.set(friend.id, friend);

        this._update.addFriend(friend);

        this.commitUpdates();
    }

    public async acceptFriends(...ids: number[]): Promise<void>
    {
        ids = [ ...ids ];

        for(let id of ids)
        {
            if(!id) continue;

            const request = this.getRequest(id);

            if(!request) continue;

            this.removeRequests(request.id);

            const friend = await this._user.manager.getOfflineUserById(request.id);

            if(!friend || !friend.messenger) continue;

            await this.addFriend(friend);

            await friend.messenger.addFriend(this._user);
        }
    }

    public async sendRequest(id: number): Promise<void>
    {
        if(!id) return;

        if(this.didRequest(id)) return;

        const existingFriend = this.getFriend(id);

        if(existingFriend) return;

        const existingRequest = this.getRequest(id);

        if(existingRequest) return this.acceptFriends(id);

        const user = await this._user.manager.getOfflineUserById(id);

        if(!user || !user.messenger) return;

        await user.messenger.receiveRequest(this._user);

        this._requestsSent.push(id);
    }

    private async receiveRequest(user: IUser): Promise<void>
    {
        if(!user) return;

        const existingRequest = this.getRequest(user.id);

        if(existingRequest) return;

        const entity = new MessengerRequestEntity();

        entity.userId       = user.id;
        entity.requestedId  = this._user.id;

        await this._user.manager.core.database.entityManager.save(entity);

        entity.user = user.details.entity;

        const request = new MessengerRequest(entity);

        if(!request) return;

        this._requests.set(request.id, request);

        this._user.processComposer(new MessengerRequestComposer(request));
    }

    public removeRequests(...ids: number[]): void
    {
        ids = [ ...ids ];

        for(let id of ids)
        {
            if(!id) continue;

            const request = this.getRequest(id);

            if(!request) continue;

            this._requests.delete(request.id);

            MessengerDao.removeRequest(request.id, this._user.id);
        }
    }

    private removeFriend(id: number, run: boolean = true): void
    {
        if(!id) return;

        const existing = this.getFriend(id);

        if(!existing) return;

        this._friends.delete(existing.id);

        this._update.removeFriend(existing);

        this.commitUpdates();

        if(run)
        {
            MessengerDao.removeFriend(this._user.id, existing.id);

            const friend = this._user.manager.getUserById(existing.id);

            if(!friend || !friend.messenger) return;

            friend.messenger.removeFriend(this._user.id, false);
        }
    }

    public removeFriends(...ids: number[]): void
    {
        ids = [ ...ids ];

        for(let id of ids)
        {
            if(!id) continue;
            
            this.removeFriend(id);
        }
    }

    public commitUpdates(): void
    {
        if(!this._update) return;

        if(!this._update.totalUpdates) return;
        
        this._user.processComposer(new MessengerUpdateComposer(this._categories.values(), this._update));

        this._update.reset();
    }

    public sendMessage(friendId: number, message: string): void
    {
        if(!friendId) return;

        const friend = this.getFriend(friendId);

        if(!friend || !friend.online) return;

        const user = this._user.manager.getUserById(friend.id);

        if(!user || !user.messenger) return;

        user.messenger.receiveMessage(this._user.id, message);
    }

    private receiveMessage(friendId: number, message: string): void
    {
        if(!friendId || !message) return;

        this._user.processComposer(new MessengerChatComposer(friendId, message, 0));
    }

    public sendRoomInvite(message: string, ...friendIds: number[]): void
    {
        friendIds = [ ...friendIds ];

        for(let friendId of friendIds)
        {
            if(!friendId) continue;

            const friend = this.getFriend(friendId);

            if(!friend || !friend.online) continue;

            const user = this._user.manager.getUserById(friend.id);

            if(!user || !user.messenger) continue;

            user.messenger.receiveRoomInvite(this._user.id, message);
        }
    }

    private receiveRoomInvite(friendId: number, message: string): void
    {
        if(this._user.details.ignoreInvites) return;

        if(!friendId) return;

        const friend = this.getFriend(friendId);

        if(!friend) return;

        this._user.processComposer(new MessengerRoomInviteComposer(friendId, message));
    }

    public getRelationships(): Map<number, MessengerFriend[]>
    {
        const relationships: Map<number, MessengerFriend[]> = new Map();

        const heart: MessengerFriend[] = [];
        const smile: MessengerFriend[] = [];
        const bobba: MessengerFriend[] = [];

        relationships.set(1, heart);
        relationships.set(2, smile);
        relationships.set(3, bobba);

        for(let friend of this._friends.values())
        {
            if(!friend) continue;

            switch(friend.relationship)
            {
                case 1: heart.push(friend); break;
                case 2: smile.push(friend); break;
                case 3: bobba.push(friend); break;
            }
        }

        return relationships;
    }

    public async loadRelationships(): Promise<void>
    {
        if(this.isLoaded) return;
        
        const results = await MessengerDao.loadRelationships(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            const friend = new MessengerFriend(result);

            if(!friend) continue;

            this._friends.set(friend.id, friend);
        }
    }

    private async loadCategories(): Promise<void>
    {
        this._categories.clear();

        const results = await MessengerDao.loadCategories(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            const category = new MessengerCategory(result);

            if(!category) continue;

            this._categories.set(category.id, category);
        }
    }

    private async loadFriends(): Promise<void>
    {
        this._friends.clear();

        const results = await MessengerDao.loadFriends(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            const friend = new MessengerFriend(result);

            if(!friend) continue;

            this._friends.set(friend.id, friend);

            if(friend.online)
            {
                const user = this._user.manager.getUserById(friend.id);

                if(user) this.updateFriend(user, false);
            }
        }
    }

    private async loadRequests(): Promise<void>
    {
        this._requests.clear();

        const results = await MessengerDao.loadRequests(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            const request = new MessengerRequest(result);

            if(!request) continue;

            this._requests.set(request.id, request);
        }
    }

    private async loadRequestsSent(): Promise<void>
    {
        this._requestsSent = [];

        const results = await MessengerDao.loadRequestsSent(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._requestsSent.push(result.requestedId);
        }
    }

    public get user(): IUser
    {
        return this._user;
    }
    
    public get categories(): Map<number, MessengerCategory>
    {
        return this._categories;
    }

    public get friends(): Map<number, MessengerFriend>
    {
        return this._friends;
    }

    public get requests(): Map<number, MessengerRequest>
    {
        return this._requests;
    }

    public get totalFriends(): number
    {
        return this.isLoaded ? this._friends.size : this._user.details.totalFriends;
    }
}