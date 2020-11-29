import { IMessageEvent, MessageEvent } from '../../../../../../../networking';
import { FurnitureWiredSaveParser } from '../../../../../parser';

export class FurnitureWiredSaveEvent extends MessageEvent implements IMessageEvent
{
    public getParser(): FurnitureWiredSaveParser
    {
        return this.parser as FurnitureWiredSaveParser;
    }
}