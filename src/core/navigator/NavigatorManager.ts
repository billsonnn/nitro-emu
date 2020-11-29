import { NitroManager } from '../../common';
import { NavigatorDao } from '../../database';
import { INitroCore } from '../interfaces';
import { IUser } from '../user';
import { NavigatorCategory } from './NavigatorCategory';
import { NavigatorTab } from './NavigatorTab';
import { NavigatorSearchResult } from './search/NavigatorSearchResult';

export class NavigatorManager extends NitroManager
{
    private _core: INitroCore;

    private _categories: Map<number, NavigatorCategory>;
    private _tabs: Map<string, NavigatorTab>;

    constructor(core: INitroCore)
    {
        super();

        this._core          = core;

        this._categories    = new Map();
        this._tabs          = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadCategories();
        await this.loadTabs();
    }

    protected async onDispose(): Promise<void>
    {
        this._categories.clear();
        this._tabs.clear();
    }

    public getCategory(id: number): NavigatorCategory
    {
        if(!id) return null;

        const existing = this._categories.get(id);

        if(!existing) return null;

        return existing;
    }

    public getTab(name: string): NavigatorTab
    {
        if(!name) return null;

        const existing = this._tabs.get(name);

        if(!existing) return null;

        return existing;
    }

    public async search(user: IUser, tabName: string, query: string = null): Promise<NavigatorSearchResult[]>
    {
        if(!user || !tabName) return null;

        const tab = this.getTab(tabName);

        if(!tab) return null;

        if(query && query !== '')
        {
            const search = this.createSearchResult(user, tab, query);

            if(!search) return null;

            await search.loadResults();

            if(!search.rooms.length) return null;

            return [ search ];
        }
        else
        {
            const results: NavigatorSearchResult[] = [];

            for(let include of tab.includes)
            {
                if(!include) continue;

                let search: NavigatorSearchResult = null;

                switch(include)
                {
                    case 'ownRooms':
                        search = this.createSearchResult(user, tab, `owner:${ user.username }:My Rooms`);
                        break;
                }

                if(!search) continue;

                await search.loadResults();

                if(!search.rooms.length) continue;

                results.push(search);
            }

            for(let category of tab.categories)
            {
                if(!category) continue;

                const search = this.createSearchResult(user, tab, `category:${ category.id }:${ category.name }`);

                if(!search) continue;

                await search.loadResults();

                if(!search.rooms.length) continue;

                results.push(search);
            }

            if(!results || !results.length) return null;

            return results;
        }
    }

    private createSearchResult(user: IUser, tab: NavigatorTab, query: string): NavigatorSearchResult
    {
        return new NavigatorSearchResult(this, user, tab, query);
    }

    private async loadCategories(): Promise<void>
    {
        this._categories.clear();

        const results = await NavigatorDao.loadCategories();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const category = new NavigatorCategory(result);

                if(!category) continue;

                this._categories.set(category.id, category);
            }
        }

        this.logger.log(`Loaded ${ this._categories.size } navigator categories`);
    }

    private async loadTabs(): Promise<void>
    {
        this._tabs.clear();

        const results = await NavigatorDao.loadTabs();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const tab = new NavigatorTab(result);

                if(!tab) continue;

                if(tab.categoryIdsString)
                {
                    const splits = tab.categoryIdsString.split(',');

                    for(let split of splits)
                    {
                        if(!split) continue;

                        const category = this.getCategory(parseInt(split));

                        if(!category) continue;

                        tab.categories.push(category);
                        tab.categoryIds.push(category.id);
                    }
                }

                this._tabs.set(tab.name, tab);
            }
        }

        this.logger.log(`Loaded ${ this._tabs.size } navigator tabs`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get categories(): Map<number, NavigatorCategory>
    {
        return this._categories;
    }

    public get tabs(): Map<string, NavigatorTab>
    {
        return this._tabs;
    }
}