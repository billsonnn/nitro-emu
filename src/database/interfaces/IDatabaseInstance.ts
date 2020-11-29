import * as TypeORM from 'typeorm';
import { INitroManager } from '../../common';
import { IDatabaseQueue } from './IDatabaseQueue';

export interface IDatabaseInstance extends INitroManager
{
    database: TypeORM.Connection;
    entityManager: TypeORM.EntityManager;
    queue: IDatabaseQueue;
}