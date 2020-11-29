import { INitroManager } from '../../common';
import { INetworkManager } from '../../networking';
import { INitroCore } from './INitroCore';

export interface INitroInstance extends INitroManager
{
    core: INitroCore;
    network: INetworkManager;
}