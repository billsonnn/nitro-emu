import { ICurrency } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class UserCurrencyComposer implements IMessageComposer
{
    private _data: any[];

    constructor(currencies: IterableIterator<ICurrency>)
    {
        let totalCurrencies = 0;

        const data: any[] = [];

        if(currencies)
        {
            for(let currency of currencies)
            {
                if(!currency) continue;

                data.push(currency.type, currency.amount);

                totalCurrencies++;
            }
        }

        this._data = [ totalCurrencies, ...data ];
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