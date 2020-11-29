import { IMessageHandler, MessageHandler } from '../../../networking';
import { CatalogClubEvent, CatalogDiscountConfigEvent, CatalogGiftConfigEvent, CatalogMarketplaceConfigEvent, CatalogModeEvent, CatalogPageEvent, CatalogPurchaseEvent, CatalogRecyclerPrizesEvent, CatalogSearchEvent } from '../incoming';
import { CatalogDiscountConfigComposer, CatalogGiftConfigComposer, CatalogMarketplaceConfigComposer, CatalogModeComposer, CatalogPageComposer, CatalogRecyclerPrizesComposer } from '../outgoing';
import { CatalogPagesComposer } from '../outgoing/catalog/CatalogPagesComposer';

export class CatalogMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new CatalogClubEvent(this.onCatalogClubEvent.bind(this)));
        this.registerEvent(new CatalogModeEvent(this.onCatalogModeEvent.bind(this)));
        this.registerEvent(new CatalogPageEvent(this.onCatalogPageEvent.bind(this)));
        this.registerEvent(new CatalogPurchaseEvent(this.onCatalogPurchaseEvent.bind(this)));
        this.registerEvent(new CatalogSearchEvent(this.onCatalogSearchEvent.bind(this)));
        this.registerEvent(new CatalogDiscountConfigEvent(this.onCatalogDiscountConfigEvent.bind(this)));
        this.registerEvent(new CatalogGiftConfigEvent(this.onCatalogGiftConfigEvent.bind(this)));
        this.registerEvent(new CatalogMarketplaceConfigEvent(this.onCatalogMarketplaceConfigEvent.bind(this)));
        this.registerEvent(new CatalogRecyclerPrizesEvent(this.onCatalogRecyclerPrizesEvent.bind(this)));
    }

    private onCatalogClubEvent(event: CatalogClubEvent): void
    {
        if(!(event instanceof CatalogClubEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onCatalogModeEvent(event: CatalogModeEvent): void
    {
        if(!(event instanceof CatalogModeEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const pages = this.instance.core.catalog.getPages(user, null);

        user.processComposer(
            new CatalogModeComposer(event.getParser().mode === 'NORMAL' ? 0 : 1),
            new CatalogPagesComposer(event.getParser().mode, pages)
        );
    }

    private onCatalogPageEvent(event: CatalogPageEvent): void
    {
        if(!(event instanceof CatalogPageEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const page = this.instance.core.catalog.getPage(user, event.getParser().pageId);

        user.processComposer(new CatalogPageComposer(page, event.getParser().mode));
    }

    private onCatalogPurchaseEvent(event: CatalogPurchaseEvent): void
    {
        if(!(event instanceof CatalogPurchaseEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        this.instance.core.catalog.purchaseItem(user, event.getParser().itemId, event.getParser().amount, event.getParser().extraData);
    }

    private onCatalogSearchEvent(event: CatalogSearchEvent): void
    {
        if(!(event instanceof CatalogSearchEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onCatalogDiscountConfigEvent(event: CatalogDiscountConfigEvent): void
    {
        if(!(event instanceof CatalogDiscountConfigEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new CatalogDiscountConfigComposer());
    }

    private onCatalogGiftConfigEvent(event: CatalogGiftConfigEvent): void
    {
        if(!(event instanceof CatalogGiftConfigEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new CatalogGiftConfigComposer());
    }

    private onCatalogMarketplaceConfigEvent(event: CatalogMarketplaceConfigEvent): void
    {
        if(!(event instanceof CatalogMarketplaceConfigEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new CatalogMarketplaceConfigComposer());
    }

    private onCatalogRecyclerPrizesEvent(event: CatalogRecyclerPrizesEvent): void
    {
        if(!(event instanceof CatalogRecyclerPrizesEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new CatalogRecyclerPrizesComposer());
    }
}