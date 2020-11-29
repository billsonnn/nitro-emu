import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class ClientEventTrackerParser implements IMessageParser
{
    private _component: string;
    private _title: string;
    private _action: string;
    private _data: string;
    private _extraData: number;

    public flush(): boolean
    {
        this._component = null;
        this._title     = null;
        this._action    = null;
        this._data      = null;
        this._extraData = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._component = wrapper.readString();
        this._title     = wrapper.readString();
        this._action    = wrapper.readString();
        this._data      = wrapper.readString();
        this._extraData = wrapper.readInt();

        return true;
    }

    public get component(): string
    {
        return this._component;
    }

    public get title(): string
    {
        return this._title;
    }

    public get action(): string
    {
        return this._action;
    }

    public get data(): string
    {
        return this._data;
    }

    public get extraData(): number
    {
        return this._extraData;
    }
}