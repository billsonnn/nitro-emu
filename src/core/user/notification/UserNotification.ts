import { NotificationListComposer } from '../../../app';
import { NitroManager } from '../../../common';
import { IUser } from '../interfaces';
import { NotificationList } from './NotificationList';

export class UserNotification extends NitroManager
{
    private _user: IUser

    constructor(user: IUser)
    {
        super(user.logger);
        
        this._user = user;
    }

    public sendNotification(type: string, message: string): void
    {
        const notification = new NotificationList(type);

        if(!notification) return;

        notification.addMessage(message);

        this._user.processComposer(new NotificationListComposer(notification));
    }

    public get user(): IUser
    {
        return this._user;
    }
}