import { MessengerFriend } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { MessengerComposerUtilities } from './MessengerComposerUtilities';

export class MessengerFriendsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(pageCount: number, currentPage: number, friends: IterableIterator<MessengerFriend>)
    {
        let totalFriends = 0;

        const data: any[] = [];

        if(friends)
        {
            for(let friend of friends)
            {
                if(!friend) continue;

                data.push(...MessengerComposerUtilities.composeFriend(friend));

                totalFriends++;
            }
        }

        this._data = [ pageCount, currentPage, totalFriends, ...data ];
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