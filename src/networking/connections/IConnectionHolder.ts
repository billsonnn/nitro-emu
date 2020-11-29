import { IMessageComposer, IMessageDataWrapper } from '../messages';

export interface IConnectionHolder
{
    processWrapper(...wrappers: IMessageDataWrapper[]): void;
    processComposer(...composers: IMessageComposer[]): void;
}