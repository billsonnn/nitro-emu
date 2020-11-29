import { MessengerCategory, MessengerUpdate } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { MessengerComposerUtilities } from './MessengerComposerUtilities';

export class MessengerUpdateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(categories: IterableIterator<MessengerCategory>, update: MessengerUpdate)
    {
        this._data = [];

        this._data.push(...MessengerComposerUtilities.composeCategories(categories));

        this._data.push(...update.getMessageArray());
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