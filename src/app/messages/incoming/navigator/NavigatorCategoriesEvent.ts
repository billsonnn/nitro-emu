import { IMessageEvent, MessageEvent } from '../../../../networking';
import { NavigatorCategoriesParser } from '../../parser';

export class NavigatorCategoriesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorCategoriesParser);
    }

    public getParser(): NavigatorCategoriesParser
    {
        return this.parser as NavigatorCategoriesParser;
    }
}