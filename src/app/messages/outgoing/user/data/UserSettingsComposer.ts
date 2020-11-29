import { IUserSettings } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class UserSettingsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(settings: IUserSettings)
    {
        this._data = [
            settings.volumeFurni,
            settings.volumeSystem,
            settings.volumeTrax,
            settings.oldChat,
            settings.blockRoomInvites,
            settings.cameraFollow,
            settings.toggles,
            settings.chatStyle
        ];
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