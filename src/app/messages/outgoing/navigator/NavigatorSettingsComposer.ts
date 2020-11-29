import { IUserNavigatorSettings } from '../../../../core';
import { IMessageComposer } from '../../../../networking';

export class NavigatorSettingsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(settings: IUserNavigatorSettings)
    {
        this._data = [ settings.x, settings.y, settings.width, settings.height, settings.searchOpen, 0 ];
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