import { UserCreditsComposer, UserCurrencyComposer } from '../../../../app';
import { NitroManager } from '../../../../common';
import { UserCurrencyDao } from '../../../../database';
import { IUser } from '../../interfaces';
import { ICurrency } from './ICurrency';

export class UserCurrency extends NitroManager
{
    public static CREDITS_TYPE: number = -1;
    
    private _user: IUser;
    private _currencies: Map<number, ICurrency>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user          = user;
        this._currencies    = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadCurrencies();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;

        this._currencies.clear();
    }

    public getCurrency(type: number): ICurrency
    {
        const existing = this._currencies.get(type);

        if(!existing) return null;

        return existing;
    }

    public hasCurrency(type: number): boolean
    {
        return this.getCurrency(type) !== null;
    }

    private async createCurrency(type: number): Promise<ICurrency>
    {
        if(typeof type !== 'number') return null;

        if(this.hasCurrency(type)) return this.getCurrency(type);

        const newCurrency = await UserCurrencyDao.createCurrency(this._user.id, type, 0);

        if(!newCurrency) return null;

        const currency: ICurrency = {
            type: newCurrency.type,
            amount: newCurrency.amount
        };
        
        this._currencies.set(currency.type, currency);

        if(currency.type === -1) this._user.processComposer(new UserCreditsComposer(currency.amount));
        else this._user.processComposer(new UserCurrencyComposer(this._currencies.values()));

        return currency;
    }

    public async modifyCurrency(type: number, amount: number): Promise<boolean>
    {
        if(typeof type !== 'number' || typeof amount !== 'number') return false;

        let currency = this.getCurrency(type);

        if(currency)
        {
            let oldAmount = currency.amount;

            const newAmount = oldAmount + amount;

            if(newAmount < 0) return false;

            currency.amount = newAmount;

            await UserCurrencyDao.updateCurrency(this._user.id, currency.type, currency.amount);

            if(currency.type === -1) this._user.processComposer(new UserCreditsComposer(currency.amount));
            else this._user.processComposer(new UserCurrencyComposer(this._currencies.values()));

            return true;
        }
        else
        {
            currency = await this.createCurrency(type);

            if(!currency) return false;

            return await this.modifyCurrency(type, amount);
        }
    }

    private async loadCurrencies(): Promise<void>
    {
        this._currencies.clear();

        const results = await UserCurrencyDao.loadCurrencies(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._currencies.set(result.type, {
                type: result.type,
                amount: result.amount
            });
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get currencies(): Map<number, ICurrency>
    {
        return this._currencies;
    }
}