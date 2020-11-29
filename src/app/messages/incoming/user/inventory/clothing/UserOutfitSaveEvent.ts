import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserOutfitSaveParser } from '../../../../parser';

export class UserOutfitSaveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserOutfitSaveParser);
    }

    public getParser(): UserOutfitSaveParser
    {
        return this.parser as UserOutfitSaveParser;
    }
}