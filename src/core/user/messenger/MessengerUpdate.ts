import { MessengerComposerUtilities } from '../../../app';
import { MessengerFriend } from './MessengerFriend';
import { MessengerUpdateType } from './MessengerUpdateType';

export class MessengerUpdate
{
    private _data: any[];

    private _totalUpdates: number;

    constructor()
    {
        this.reset();
    }

    public reset(): void
    {
        this._data          = [];

        this._totalUpdates  = 0;
    }

    public addFriend(friend: MessengerFriend): MessengerUpdate
    {
        if(!friend) return;

        this._data.push(MessengerUpdateType.ADD, ...MessengerComposerUtilities.composeFriend(friend));

        this._totalUpdates++;

        return this;
    }

    public updateFriend(friend: MessengerFriend): MessengerUpdate
    {
        if(!friend) return;

        this._data.push(MessengerUpdateType.UPDATE, ...MessengerComposerUtilities.composeFriend(friend));

        this._totalUpdates++;

        return this;
    }

    public removeFriend(friend: MessengerFriend): MessengerUpdate
    {
        if(!friend) return;

        this._data.push(MessengerUpdateType.REMOVE, friend.id);

        this._totalUpdates++;

        return this;
    }

    public getMessageArray(): any[]
    {
        return [ this._totalUpdates, ...this._data ];
    }

    public get totalUpdates(): number
    {
        return this._totalUpdates;
    }
}