require('dotenv').config();

import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as DBConfig from '../dbconfig.json';
import { Application } from './app';
import { NitroCore } from './core';
import { DatabaseFactory } from './database';

NitroCore.init();

if(process.env.PRODUCTION === 'false') DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.ts'));
else DBConfig.entities.push(join(__dirname, '/database/entities/*Entity.js'));

const database  = DatabaseFactory.createDatabaseInstance(DBConfig as MysqlConnectionOptions);
const instance  = new Application(new NitroCore(database));

async function init(): Promise<void>
{
    try
    {
        if(database) await database.init();

        if(instance) await instance.init();
    }

    catch(err)
    {
        console.error(err.message || err);

        instance.core && instance.core.dispose();
    }
}

init();