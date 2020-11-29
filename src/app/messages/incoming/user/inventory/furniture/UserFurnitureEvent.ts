import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserFurnitureParser } from '../../../../parser';

export class UserFurnitureEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserFurnitureParser);
    }

    public getParser(): UserFurnitureParser
    {
        return this.parser as UserFurnitureParser;
    }
}