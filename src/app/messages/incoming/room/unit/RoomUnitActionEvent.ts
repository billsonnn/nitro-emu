import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomUnitActionParser } from '../../../parser';

export class RoomUnitActionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitActionParser);
    }

    public getParser(): RoomUnitActionParser
    {
        return this.parser as RoomUnitActionParser;
    }
}