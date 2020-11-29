import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserTagsParser } from '../../../parser';

export class UserTagsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserTagsParser);
    }

    public getParser(): UserTagsParser
    {
        return this.parser as UserTagsParser;
    }
}