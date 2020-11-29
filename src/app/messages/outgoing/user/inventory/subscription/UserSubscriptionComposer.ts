import { TimeHelper } from '../../../../../../common';
import { UserSubscription } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class UserSubscriptionComposer implements IMessageComposer
{
    private _data: any[];

    constructor(subscription: UserSubscription)
    {
        const remaining = TimeHelper.timeBetween(TimeHelper.now, subscription.expiration);

        this._data = [
            subscription.entity.name,
            remaining.days, // days
            1,
            remaining.months, // periods
            remaining.years,
            true, true,
            0, 0,
            remaining.totalSeconds
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