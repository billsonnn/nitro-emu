import { NotificationDisplayEnum, NotificationKeyEnum } from './enum';
import { NotificationListItem } from './NotificationListItem';

export class NotificationList
{
    private _type: string;
    private _items: NotificationListItem[];

    constructor(type: string)
    {
        this._type  = type;
        this._items = [];

        this.addItem(NotificationKeyEnum.DISPLAY, NotificationDisplayEnum.BUBBLE);
        this.addItem(NotificationKeyEnum.COUNT, '1');
    }

    public addMessage(message: string): void
    {
        this.addItem(NotificationKeyEnum.MESSAGE, message);
    }

    private addItem(key: string, value: string): void
    {
        this._items.push(new NotificationListItem(key, value));
    }

    public get type(): string
    {
        return this._type;
    }

    public get items(): NotificationListItem[]
    {
        return this._items;
    }
}