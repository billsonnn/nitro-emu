import { IDatabaseInstance } from '../database';
import { INitroCore } from './interfaces';
import { NitroCore } from './NitroCore';

export class NitroCoreFactory
{
    public static createCoreInstance(database: IDatabaseInstance): INitroCore
    {
        if(!database) return null;

        return new NitroCore(database);
    }
}