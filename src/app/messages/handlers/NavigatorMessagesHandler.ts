import { IMessageHandler, MessageHandler } from '../../../networking';
import { NavigatorCategoriesEvent, NavigatorInitEvent, NavigatorPromotedRoomsEvent, NavigatorSearchCloseEvent, NavigatorSearchEvent, NavigatorSearchOpenEvent, NavigatorSearchSaveEvent, NavigatorSettingsEvent, NavigatorSettingsSaveEvent } from '../incoming';
import { NavigatorCategoriesComposer, NavigatorCollapsedCategoriesComposer, NavigatorLiftedRoomsComposer, NavigatorSearchComposer, NavigatorSearchesSavedComposer, NavigatorSettingsComposer, NavigatorTabsComposer } from '../outgoing';

export class NavigatorMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new NavigatorCategoriesEvent(this.onNavigatorCategoriesEvent.bind(this)));
        this.registerEvent(new NavigatorInitEvent(this.onNavigatorInitEvent.bind(this)));
        this.registerEvent(new NavigatorPromotedRoomsEvent(this.onNavigatorPromotedRoomsEvent.bind(this)));
        this.registerEvent(new NavigatorSettingsEvent(this.onNavigatorSettingsEvent.bind(this)));
        this.registerEvent(new NavigatorSettingsSaveEvent(this.onNavigatorSettingsSaveEvent.bind(this)));
        this.registerEvent(new NavigatorSearchCloseEvent(this.onNavigatorSearchCloseEvent.bind(this)));
        this.registerEvent(new NavigatorSearchEvent(this.onNavigatorSearchEvent.bind(this)));
        this.registerEvent(new NavigatorSearchOpenEvent(this.onNavigatorSearchOpenEvent.bind(this)));
        this.registerEvent(new NavigatorSearchSaveEvent(this.onNavigatorSearchSaveEvent.bind(this)));
    }

    private onNavigatorCategoriesEvent(event: NavigatorCategoriesEvent): void
    {
        if(!(event instanceof NavigatorCategoriesEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new NavigatorCategoriesComposer(this.instance.core.navigator.categories.values()));
    }

    private onNavigatorInitEvent(event: NavigatorInitEvent): void
    {
        if(!(event instanceof NavigatorInitEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(
            new NavigatorSettingsComposer(user.details.navigatorSettings),
            new NavigatorTabsComposer(this.instance.core.navigator.tabs.values()),
            new NavigatorCollapsedCategoriesComposer(null),
            new NavigatorLiftedRoomsComposer(),
            new NavigatorSearchesSavedComposer()
        );
    }

    private onNavigatorPromotedRoomsEvent(event: NavigatorPromotedRoomsEvent): void
    {
        if(!(event instanceof NavigatorPromotedRoomsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onNavigatorSettingsEvent(event: NavigatorSettingsEvent): void
    {
        if(!(event instanceof NavigatorSettingsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.processComposer(new NavigatorSettingsComposer(user.details.navigatorSettings));
    }

    private onNavigatorSettingsSaveEvent(event: NavigatorSettingsSaveEvent): void
    {
        if(!(event instanceof NavigatorSettingsSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        user.details.updateNavigator({
            x: event.getParser().x,
            y: event.getParser().y,
            width: event.getParser().width,
            height: event.getParser().height,
            searchOpen: event.getParser().searchOpen
        });
    }

    private onNavigatorSearchCloseEvent(event: NavigatorSearchCloseEvent): void
    {
        if(!(event instanceof NavigatorSearchCloseEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private async onNavigatorSearchEvent(event: NavigatorSearchEvent): Promise<void>
    {
        if(!(event instanceof NavigatorSearchEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const navigator = this.instance.core.navigator;

        if(!navigator) return;

        const tab       = event.getParser().tab;
        const query     = event.getParser().query;
        const searches  = await navigator.search(user, tab, query);

        user.processComposer(new NavigatorSearchComposer(tab, query, searches));
    }

    private onNavigatorSearchOpenEvent(event: NavigatorSearchOpenEvent): void
    {
        if(!(event instanceof NavigatorSearchOpenEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }

    private onNavigatorSearchSaveEvent(event: NavigatorSearchSaveEvent): void
    {
        if(!(event instanceof NavigatorSearchSaveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;
    }
}