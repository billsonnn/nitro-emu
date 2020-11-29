export class NotificationListItem
{
    private _key: string;
    private _value: string;

    constructor(key: string, value: string)
    {
        this._key   = key;
        this._value = value;
    }

    public get key(): string
    {
        return this._key;
    }

    public get value(): string
    {
        return this._value;
    }
}