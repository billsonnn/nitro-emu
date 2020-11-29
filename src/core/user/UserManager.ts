import { NitroManager } from '../../common';
import { UserDao, UserEntity } from '../../database';
import { IConnection } from '../../networking';
import { INitroCore } from '../interfaces';
import { IUser } from './interfaces';
import { User } from './User';

export class UserManager extends NitroManager
{
    private _core: INitroCore;

    private _users: Map<number, IUser>;

    constructor(core: INitroCore)
    {
        super();

        this._core  = core;

        this._users = new Map();
    }

    protected async onDispose(): Promise<void>
    {
        await this.removeAllUsers();
    }

    public getUserById(id: number): IUser
    {
        if(!id) return null;

        const existing = this._users.get(id);

        if(!existing) return null;

        return existing;
    }

    public getUserByUsername(username: string): IUser
    {
        if(!username) return null;

        username = username.toLocaleLowerCase();

        for(let user of this._users.values())
        {
            if(!user) continue;

            if(user.details.username.toLocaleLowerCase() !== username) continue;

            return user;
        }

        return null;
    }

    public async getOfflineUserById(id: number, remove: boolean = false): Promise<IUser>
    {
        if(!id) return null;

        const existing = this.getUserById(id);

        if(existing)
        {
            if(remove) await existing.dispose();
            else return existing;
        }

        const entity = await UserDao.getUserById(id);

        if(!entity) return null;

        const user = new User(this, entity);

        if(!user) return null;

        return user;
    }

    public async getOfflineUserByUsername(username: string, remove: boolean = false): Promise<IUser>
    {
        if(!username) return null;

        const existing = this.getUserByUsername(username);

        if(existing)
        {
            if(remove) await existing.dispose();
            else return existing;
        }

        const entity = await UserDao.getUserByUsername(username);

        if(!entity) return null;

        const user = new User(this, entity);

        if(!user) return null;

        return user;
    }

    public async createUser(id: number, connection: IConnection): Promise<IUser>
    {
        if(!id || !connection) return null;

        const user = await this.getOfflineUserById(id, true);

        if(!user) return null;

        if(!user.setConnection(connection))
        {
            user.dispose();
            connection.dispose();

            return null;
        }

        this._users.set(user.id, user);

        await user.init();

        return user;
    }

    public removeUser(id: number): void
    {
        if(!id) return;

        const existing = this.getUserById(id);

        if(!existing) return;

        this._users.delete(id);
        
        existing.dispose();
    }

    public async removeAllUsers(): Promise<void>
    {
        for(let user of this._users.values())
        {
            if(!user) continue;

            this._users.delete(user.id);

            await user.dispose();
        }
    }

    public async searchUsersByUsername(username: string): Promise<UserEntity[]>
    {
        if(!username) return null;

        const results = await UserDao.searchUsersByUsername(username);

        if(!results || !results.length) return null;

        return results;
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get users(): Map<number, IUser>
    {
        return this._users;
    }
}