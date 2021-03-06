import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class CatalogGiftConfigParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        return true;
    }
}