import { CatalogPurchaseComposer, CatalogPurchaseFailedComposer, CatalogPurchaseUnavailableComposer, CatalogSoldOutComposer } from '../../app';
import { NitroManager } from '../../common';
import { CatalogItemDao, CatalogPageDao } from '../../database';
import { IFurniture } from '../furniture';
import { INitroCore } from '../interfaces';
import { IUser, UserCurrency } from '../user';
import { CatalogItem } from './CatalogItem';
import { CatalogPage } from './CatalogPage';
import { CatalogPurchaseFailedEnum, CatalogPurchaseUnavailableEnum } from './enum';
import { CatalogLayout, ClubBuyLayout, DefaultLayout, FrontPageFeaturedLayout, FrontPageLayout, GroupFrontpageLayout, GroupFurniLayout, PetInfoLayout, SpacesNewLayout } from './layouts';

export class CatalogManager extends NitroManager
{
    private _core: INitroCore;

    private _layouts: Map<string, CatalogLayout>;
    private _pages: Map<number, CatalogPage>;
    private _items: Map<number, CatalogItem>;

    constructor(core: INitroCore)
    {
        super();

        if(!core) throw new Error('invalid_core');

        this._core      = core;

        this._layouts   = new Map();
        this._pages     = new Map();
        this._items     = new Map();
    }

    protected async onInit(): Promise<void>
    {
        this.loadLayouts();

        await this.loadPages();
        await this.loadItems();
    }

    protected async onDispose(): Promise<void>
    {
        this._items.clear();
        this._pages.clear();
        this._layouts.clear();
    }

    public getLayout(name: string): CatalogLayout
    {
        const existing = this._layouts.get(name);

        if(!existing) return null;

        return existing;
    }

    public getPage(user: IUser, pageId: number): CatalogPage
    {
        if(!user || !pageId) return null;

        const existing = this._pages.get(pageId);

        if(!existing) return null;

        if(existing.minRank && (existing.minRank > user.rank.id)) return null;

        return existing;
    }

    public getPages(user: IUser, parentId: number): CatalogPage[]
    {
        if(!user) return null;

        if(!this._pages.size) return null;

        const results: CatalogPage[] = [];

        for(let page of this._pages.values())
        {
            if(!page) continue;

            if(page.parentId !== parentId) continue;

            if(page.minRank)
            {
                if(!user.rank || (page.minRank > user.rank.id)) continue;

                if(page.minRank > user.rank.id) continue;
            }

            results.push(page);
        }

        if(!results || !results.length) return null;

        return results;
    }

    public async purchaseItem(user: IUser, itemId: number, amount: number = 1, extraData: string = null): Promise<void>
    {
        if(!user || !itemId || !amount) return;

        amount = Math.abs(amount);

        const item = this._items.get(itemId);

        if(!item || (item.page && item.page.minRank && (item.page.minRank > user.rank.id)))
        {
            user.processComposer(new CatalogPurchaseUnavailableComposer(CatalogPurchaseUnavailableEnum.ILLEGAL));

            return;
        }

        if(item.clubOnly && !user.inventory.subscriptions.hasHabboClub())
        {
            user.processComposer(new CatalogPurchaseUnavailableComposer(CatalogPurchaseUnavailableEnum.HABBO_CLUB));

            return;
        }

        if(item.isUnique && !item.uniqueRemaining)
        {
            user.processComposer(new CatalogSoldOutComposer());

            return;
        }

        const costCredits   = (item.costCredits || 0) * amount;
        const costCurrency  = (item.costCurrency || 0) * amount;

        if(costCredits)
        {
            const didSpend = await user.inventory.currency.modifyCurrency(UserCurrency.CREDITS_TYPE, -Math.abs(costCredits));

            if(!didSpend)
            {
                user.processComposer(new CatalogPurchaseFailedComposer(CatalogPurchaseFailedEnum.ERROR));

                return;
            }
        }

        if(costCurrency)
        {
            const didSpend = await user.inventory.currency.modifyCurrency(item.costCurrencyType, -Math.abs(costCurrency));

            if(!didSpend)
            {
                if(costCredits) await user.inventory.currency.modifyCurrency(UserCurrency.CREDITS_TYPE, Math.abs(costCredits));

                user.processComposer(new CatalogPurchaseFailedComposer(CatalogPurchaseFailedEnum.ERROR));

                return;
            }
        }

        if(!item.definitions || !item.definitions.length)
        {
            user.processComposer(new CatalogPurchaseFailedComposer(CatalogPurchaseFailedEnum.ERROR));

            return;
        }

        const items: IFurniture[] = [];

        for(let definition of item.definitions)
        {
            if(!definition) continue;

            for(let i = 0; i < amount; i++)
            {
                const furniture = await this._core.furniture.createFurniture(user, definition.id, extraData);

                if(!furniture) continue;

                items.push(furniture);
            }
        }

        if(!items || !items.length)
        {
            user.processComposer(new CatalogPurchaseFailedComposer(CatalogPurchaseFailedEnum.ERROR));

            return;
        }

        user.inventory.furniture.addFurniture(...items);

        user.processComposer(new CatalogPurchaseComposer(item));
    }

    private setParents(): void
    {
        if(!this._pages.size) return;

        for(let page of this._pages.values())
        {
            if(!page) continue;

            if(!page.parentId) continue;
            
            const parent = this._pages.get(page.parentId);

            if(!parent) continue;
            
            parent.addChild(page);
        }
    }

    private loadLayouts(): void
    {
        const clubBuyLayout = new ClubBuyLayout();
        this._layouts.set(clubBuyLayout.name, clubBuyLayout);

        const defaultLayout = new DefaultLayout();
        this._layouts.set(defaultLayout.name, defaultLayout);

        const frontPageFeaturedLayout = new FrontPageFeaturedLayout();
        this._layouts.set(frontPageFeaturedLayout.name, frontPageFeaturedLayout);

        const frontPageLayout = new FrontPageLayout();
        this._layouts.set(frontPageLayout.name, frontPageLayout);

        const groupFrontpageLayout = new GroupFrontpageLayout();
        this._layouts.set(groupFrontpageLayout.name, groupFrontpageLayout);

        const groupFurniLayout = new GroupFurniLayout();
        this._layouts.set(groupFurniLayout.name, groupFurniLayout);

        const petInfoLayout = new PetInfoLayout();
        this._layouts.set(petInfoLayout.name, petInfoLayout);

        const spacesNewLayout = new SpacesNewLayout();
        this._layouts.set(spacesNewLayout.name, spacesNewLayout);

        this.logger.log(`Loaded ${ this._layouts.size } layouts`);
    }

    private async loadPages(): Promise<void>
    {
        this._pages.clear();

        const results = await CatalogPageDao.loadAllPages();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const page = new CatalogPage(this, result);

                if(!page) continue;

                this._pages.set(page.id, page);
            }

            this.setParents();
        }

        this.logger.log(`Loaded ${ this._pages.size } catalog pages`);
    }

    private async loadItems(): Promise<void>
    {
        this._items.clear();

        const results = await CatalogItemDao.loadAllItems();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const page = this._pages.get(result.pageId);

                if(!page) continue;

                const item = new CatalogItem(this, result);

                if(!item) continue;

                if(!page.addItem(item)) continue;

                this._items.set(item.id, item);
            }
        }

        this.logger.log(`Loaded ${ this._items.size } catalog items`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }
}