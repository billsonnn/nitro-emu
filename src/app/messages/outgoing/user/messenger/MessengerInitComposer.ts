import { MessengerCategory } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { MessengerComposerUtilities } from './MessengerComposerUtilities';

export class MessengerInitComposer implements IMessageComposer
{
    private _data: any[];

    constructor(maxFriends: number, maxFriendsHabboClub: number, categories: IterableIterator<MessengerCategory>)
    {
        this._data = [ maxFriends, 0, maxFriendsHabboClub ];

        this._data.push(...MessengerComposerUtilities.composeCategories(categories));
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}