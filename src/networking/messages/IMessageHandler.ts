import { INitroManager } from '../../common';
import { INitroInstance } from '../../core';
import { IServer } from '../servers';
import { IMessageEvent } from './IMessageEvent';

export interface IMessageHandler extends INitroManager
{
    registerEvent(event: IMessageEvent): void;
    removeAllEvents(): void;
    instance: INitroInstance;
    server: IServer;
}