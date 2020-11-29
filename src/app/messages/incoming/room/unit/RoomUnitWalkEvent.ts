import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomUnitWalkParser } from '../../../parser';

export class RoomUnitWalkEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitWalkParser);
    }

    public getParser(): RoomUnitWalkParser
    {
        return this.parser as RoomUnitWalkParser;
    }
}