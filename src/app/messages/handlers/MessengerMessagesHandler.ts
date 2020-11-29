import { UserDao } from '../../../database';
import { IMessageHandler, MessageHandler } from '../../../networking';
import { MessengerAcceptEvent, MessengerChatEvent, MessengerDeclineEvent, MessengerFollowEvent, MessengerFriendsEvent, MessengerInitEvent, MessengerRelationshipsEvent, MessengerRelationshipUpdateEvent, MessengerRemoveEvent, MessengerRequestEvent, MessengerRequestsEvent, MessengerRoomInviteEvent, MessengerSearchEvent, MessengerUpdatesEvent } from '../incoming';
import { MessengerFriendsComposer, MessengerInitComposer, MessengerRelationshipsComposer, MessengerRequestsComposer, MessengerSearchComposer } from '../outgoing';

export class MessengerMessagesHandler extends MessageHandler implements IMessageHandler
{
    protected onInit(): void
    {
        this.registerEvent(new MessengerAcceptEvent(this.onMessengerAcceptEvent.bind(this)));
        this.registerEvent(new MessengerChatEvent(this.onMessengerChatEvent.bind(this)));
        this.registerEvent(new MessengerDeclineEvent(this.onMessengerDeclineEvent.bind(this)));
        this.registerEvent(new MessengerFollowEvent(this.onMessengerFollowEvent.bind(this)));
        this.registerEvent(new MessengerFriendsEvent(this.onMessengerFriendsEvent.bind(this)));
        this.registerEvent(new MessengerInitEvent(this.onMessengerInitEvent.bind(this)));
        this.registerEvent(new MessengerRelationshipsEvent(this.onMessengerRelationshipsEvent.bind(this)));
        this.registerEvent(new MessengerRelationshipUpdateEvent(this.onMessengerRelationshipUpdateEvent.bind(this)));
        this.registerEvent(new MessengerRemoveEvent(this.onMessengerRemoveEvent.bind(this)));
        this.registerEvent(new MessengerRequestEvent(this.onMessengerRequestEvent.bind(this)));
        this.registerEvent(new MessengerRequestsEvent(this.onMessengerRequestsEvent.bind(this)));
        this.registerEvent(new MessengerRoomInviteEvent(this.onMessengerRoomInviteEvent.bind(this)));
        this.registerEvent(new MessengerSearchEvent(this.onMessengerSearchEvent.bind(this)));
        this.registerEvent(new MessengerUpdatesEvent(this.onMessengerUpdatesEvent.bind(this)));
    }

    private onMessengerAcceptEvent(event: MessengerAcceptEvent): void
    {
        if(!(event instanceof MessengerAcceptEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.acceptFriends(...event.getParser().friendIds);
    }

    private onMessengerChatEvent(event: MessengerChatEvent): void
    {
        if(!(event instanceof MessengerChatEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.sendMessage(event.getParser().friendId, event.getParser().message);
    }

    private onMessengerDeclineEvent(event: MessengerDeclineEvent): void
    {
        if(!(event instanceof MessengerDeclineEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.removeRequests(...event.getParser().friendIds);
    }

    private onMessengerFollowEvent(event: MessengerFollowEvent): void
    {
        if(!(event instanceof MessengerFollowEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;
    }

    private onMessengerFriendsEvent(event: MessengerFriendsEvent): void
    {
        if(!(event instanceof MessengerFriendsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        event.connection.processComposer(new MessengerFriendsComposer(1, 1, user.messenger.friends.values()));
    }

    private onMessengerInitEvent(event: MessengerInitEvent): void
    {
        if(!(event instanceof MessengerInitEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        event.connection.processComposer(new MessengerInitComposer(300, 500, user.messenger.categories.values()));
    }

    private async onMessengerRelationshipsEvent(event: MessengerRelationshipsEvent): Promise<void>
    {
        if(!(event instanceof MessengerRelationshipsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user) return;

        const activeUser = await this.instance.core.user.getOfflineUserById(event.getParser().userId);

        if(!activeUser || !activeUser.messenger) return;

        await activeUser.messenger.loadRelationships();

        event.connection.processComposer(new MessengerRelationshipsComposer(activeUser.id, activeUser.messenger.getRelationships()));
    }

    private onMessengerRelationshipUpdateEvent(event: MessengerRelationshipUpdateEvent): void
    {
        if(!(event instanceof MessengerRelationshipUpdateEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.updateRelationship(event.getParser().friendId, event.getParser().relationship);
    }

    private onMessengerRemoveEvent(event: MessengerRemoveEvent): void
    {
        if(!(event instanceof MessengerRemoveEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.removeFriends(...event.getParser().friendIds);
    }

    private async onMessengerRequestEvent(event: MessengerRequestEvent): Promise<void>
    {
        if(!(event instanceof MessengerRequestEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        const id = await UserDao.getIdByUsername(event.getParser().username);

        if(!id) return;

        user.messenger.sendRequest(id);
    }

    private onMessengerRequestsEvent(event: MessengerRequestsEvent): void
    {
        if(!(event instanceof MessengerRequestsEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        event.connection.processComposer(new MessengerRequestsComposer(user.messenger.requests.values()));
    }

    private onMessengerRoomInviteEvent(event: MessengerRoomInviteEvent): void
    {
        if(!(event instanceof MessengerRoomInviteEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.sendRoomInvite(event.getParser().message, ...event.getParser().friendIds);
    }

    private async onMessengerSearchEvent(event: MessengerSearchEvent): Promise<void>
    {
        if(!(event instanceof MessengerSearchEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        const results = await this.instance.core.user.searchUsersByUsername(event.getParser().username);

        if(!results)
        {
            event.connection.processComposer(new MessengerSearchComposer([ 0, 0 ]))
        }
        else
        {
            let totalFriends        = 0;
            let totalUsers          = 0;

            const friends: any[]    = [];
            const users: any[]      = [];

            if(results)
            {
                for(let result of results)
                {
                    if(!result) continue;

                    if(result.id === user.id) continue;

                    let messageArray = [ result.id, result.username, result.motto, false, false, null, 1, (result.online === 1 ? result.figure : null), null ];

                    const existing = user.messenger.getFriend(result.id);

                    if(existing)
                    {
                        totalFriends++;

                        friends.push(...messageArray);
                    }
                    else
                    {
                        totalUsers++;

                        users.push(...messageArray);
                    }
                }
            }

            event.connection.processComposer(new MessengerSearchComposer([ totalFriends, ...friends, totalUsers, ...users ]))
        }
    }

    private onMessengerUpdatesEvent(event: MessengerUpdatesEvent): void
    {
        if(!(event instanceof MessengerUpdatesEvent)) return;

        const user = event.connection && event.connection.user;

        if(!user || !user.messenger) return;

        user.messenger.commitUpdates();
    }
}