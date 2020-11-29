import { NitroManager } from '../common';
import { IDatabaseInstance, IDatabaseQueue } from './interfaces';

export class DatabaseQueue extends NitroManager implements IDatabaseQueue
{
    private _database: IDatabaseInstance;

    private _queued: any[];
    private _queueInterval: NodeJS.Timeout;

    private _isProcessing: boolean;

    constructor(database: IDatabaseInstance)
    {
        super();

        this._database      = database;
        this._queued        = [];
        this._queueInterval = null;

        this._isProcessing  = false;
    }

    protected onInit(): void
    {
        this._queueInterval = setInterval(() => this.processQueue(), 10000);
    }

    protected async onDispose(): Promise<void>
    {
        if(this._queueInterval)
        {
            clearInterval(this._queueInterval);

            this._queueInterval = null;
        }

        await this.processQueue();
    }

    public queueEntity<Entity>(entity: Entity): void
    {
        if(!entity) return;
        
        if(this._queued.indexOf(entity) >= 0) return;

        this._queued.push(entity);
    }

    public async processNow<Entity>(entity: Entity): Promise<void>
    {
        if(!entity) return;

        const index = this._queued.indexOf(entity);

        if(index >= 0) this._queued.splice(index, 1);

        await this._database.entityManager.save(entity);
    }

    public async processQueue(): Promise<void>
    {
        if(this._isProcessing || !this._queued.length) return;

        this._isProcessing = true;

        await this._database.entityManager.save(this._queued);

        this._queued = [];

        this._isProcessing = false;
    }
}