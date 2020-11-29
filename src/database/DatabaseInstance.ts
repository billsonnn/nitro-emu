import * as TypeORM from 'typeorm';
import { NitroManager } from '../common';
import { DatabaseQueue } from './DatabaseQueue';
import { IDatabaseInstance, IDatabaseQueue } from './interfaces';

export class DatabaseInstance extends NitroManager implements IDatabaseInstance
{
    private _options: TypeORM.ConnectionOptions;
    private _database: TypeORM.Connection;

    private _queue: IDatabaseQueue;

    constructor(options: TypeORM.ConnectionOptions)
    {
        super();

        this._options   = options;
        this._database  = null;

        this._queue     = new DatabaseQueue(this);
    }

    protected async onInit(): Promise<void>
    {
        const connection = await TypeORM.createConnection(this._options);

        if(!connection)
        {
            this.logger.error('Database Error');

            return;
        }

        this.logger.log('Database Connected');

        this._database = connection;

        if(this._queue) await this._queue.init();
    }

    protected async onDispose(): Promise<void>
    {
        if(this._queue) await this._queue.dispose();

        if(!this._database) return;
        
        if(this._database.isConnected) await this._database.close();

        this.logger.log('Database Closed');

        this._database = null;
    }

    public get database(): TypeORM.Connection
    {
        return this._database;
    }

    public get entityManager(): TypeORM.EntityManager
    {
        return this._database && this._database.manager;
    }

    public get queue(): IDatabaseQueue
    {
        return this._queue;
    }
}