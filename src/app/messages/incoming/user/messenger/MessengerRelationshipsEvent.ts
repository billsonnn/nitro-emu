import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRelationshipsParser } from '../../../parser';

export class MessengerRelationshipsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRelationshipsParser);
    }

    public getParser(): MessengerRelationshipsParser
    {
        return this.parser as MessengerRelationshipsParser;
    }
}