import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserOutfitsParser } from '../../../../parser';

export class UserOutfitsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserOutfitsParser);
    }

    public getParser(): UserOutfitsParser
    {
        return this.parser as UserOutfitsParser;
    }
}