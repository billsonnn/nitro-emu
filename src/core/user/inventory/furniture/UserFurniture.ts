import { UserFurnitureAddComposer, UserFurnitureComposer, UserFurnitureRefreshComposer, UserFurnitureRemoveComposer } from '../../../../app';
import { NitroManager } from '../../../../common';
import { FurnitureDao } from '../../../../database';
import { Furniture, IFurniture } from '../../../furniture';
import { IUser } from '../../interfaces';

export class UserFurniture extends NitroManager
{
    public static MAX_FAVORITE_ROOMS: number = 100;
    
    private _user: IUser;

    private _furniture: Map<number, IFurniture>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user      = user;

        this._furniture = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadFurniture();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;

        this._furniture.clear();
    }

    public getFurniture(id: number): IFurniture
    {
        const existing = this._furniture.get(id);

        if(!existing) return null;

        return existing;
    }

    public addFurniture(...furniture: IFurniture[]): void
    {
        furniture = [ ...furniture ];

        const ids: number[] = [];

        for(let item of furniture)
        {
            if(!item) continue;

            const existing = this.getFurniture(item.id);

            if(existing) continue;

            item.clearRoom();

            if(!item.setOwner(this._user)) continue;

            this._furniture.set(item.id, item);

            ids.push(item.id);
        }

        if(!ids || !ids.length) return;

        this._user.processComposer(
            new UserFurnitureAddComposer(ids),
            new UserFurnitureRefreshComposer()
        );
    }

    public removeFurniture(...furniture: IFurniture[]): void
    {
        furniture = [ ...furniture ];

        for(let item of furniture)
        {
            if(!item) continue;

            const existing = this.getFurniture(item.id);

            if(existing !== item) continue;

            this._furniture.delete(item.id);

            this._user.processComposer(new UserFurnitureRemoveComposer(item.id));
        }
    }

    public sendAllFurniture(): void
    {
        const furniture     = Array.from(this._furniture).reverse();
        const totalItems    = (furniture && furniture.length) || 0;

        let totalPages = Math.ceil(totalItems / 1000);

        if(!totalPages) totalPages = 1;

        let items: IFurniture[] = [];
        let count: number       = 0;
        let page: number        = 0;

        for(let [ id, item ] of furniture)
        {
            if(!item) continue;

            if(!count) page++;

            items.push(item);
            count++;

            if(count === 1000)
            {
                this._user.processComposer(new UserFurnitureComposer(totalPages, page, items));

                items   = [];
                count   = 0;
            }
        }
        
        if(count > 0) this._user.processComposer(new UserFurnitureComposer(totalPages, page, items));
    }

    private async loadFurniture(): Promise<void>
    {
        this._furniture.clear();

        const results = await FurnitureDao.loadUserFurniture(this._user.id);

        if(!results || !results.length) return;

        for(let result of results)
        {
            if(!result) continue;

            try
            {
                const furniture = new Furniture(this._user.manager.core.furniture, result);

                if(!furniture || !furniture.setOwner(this._user)) continue;

                this._furniture.set(furniture.id, furniture);
            }

            catch(err)
            {
                this.logger.error(err.message || err, err.stack);
            }
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get furniture(): Map<number, IFurniture>
    {
        return this._furniture;
    }
}