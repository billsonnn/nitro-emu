import * as TypeORM from 'typeorm';
import { DatabaseInstance } from './DatabaseInstance';
import { IDatabaseInstance } from './interfaces';

export class DatabaseFactory
{
    public static createDatabaseInstance(options: TypeORM.ConnectionOptions): IDatabaseInstance
    {
        if(!options) return null;

        return new DatabaseInstance(options);
    }
}