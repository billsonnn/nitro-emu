import { INitroInstance } from '../core';
import { INetworkManager } from './INetworkManager';
import { NetworkManager } from './NetworkManager';

export class NetworkFactory
{
    public static createNetworkManager(instance: INitroInstance): INetworkManager
    {
        return new NetworkManager(instance);
    }
}