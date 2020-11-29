import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRelationshipUpdateParser } from '../../../parser';

export class MessengerRelationshipUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRelationshipUpdateParser);
    }

    public getParser(): MessengerRelationshipUpdateParser
    {
        return this.parser as MessengerRelationshipUpdateParser;
    }
}