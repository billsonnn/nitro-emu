import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class CatalogRecyclerPrizesParser implements IMessageParser
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