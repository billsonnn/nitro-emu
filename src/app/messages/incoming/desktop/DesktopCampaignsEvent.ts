import { IMessageEvent, MessageEvent } from '../../../../networking';
import { DesktopCampaignsParser } from '../../parser';

export class DesktopCampaignsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DesktopCampaignsParser);
    }

    public getParser(): DesktopCampaignsParser
    {
        return this.parser as DesktopCampaignsParser;
    }
}