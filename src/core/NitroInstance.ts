import { NitroManager, TimeHelper } from '../common';
import { INetworkManager, NetworkFactory } from '../networking';
import { INitroCore, INitroInstance } from './interfaces';

export class NitroInstance extends NitroManager implements INitroInstance
{
    private _core: INitroCore;
    private _network: INetworkManager;

    private _timestampStarted: number;

    constructor(core: INitroCore)
    {
        super();

        if(!core) throw new Error('invalid_core');

        this._core              = core;
        this._network           = NetworkFactory.createNetworkManager(this);

        this._timestampStarted  = 0;
    }

    protected async onInit(): Promise<void>
    {
        this._timestampStarted = TimeHelper.currentTimestamp;

        if(this._core) await this._core.init();
        if(this._network) await this._network.init();
    }

    protected async onDispose(): Promise<void>
    {
        if(this._network) await this._network.dispose();
        if(this._core) await this._core.dispose();

        this._timestampStarted = 0;

        this.logger.log(`Disposed`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get network(): INetworkManager
    {
        return this._network;
    }

    protected get timestampStarted(): number
    {
        return this._timestampStarted;
    }
}