import { INitroManager } from '../../common';

export interface IDatabaseQueue extends INitroManager
{
    queueEntity<Entity>(entity: Entity): void;
    processNow<Entity>(entity: Entity): Promise<void>;
    processQueue(): Promise<void>;
}