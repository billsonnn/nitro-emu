import { INitroManager } from '../../../common';
import { INitroCore } from '../../interfaces';
import { IUser } from '../../user';
import { IFurnitureDefinition } from '../definition';
import { IFurniture } from './IFurniture';

export interface IFurnitureManager extends INitroManager
{
    getDefinition(id: number): IFurnitureDefinition;
    createFurniture(user: IUser, definitionId: number, extraData?: string): Promise<IFurniture>;
    core: INitroCore;
    definitions: Map<number, IFurnitureDefinition>;
}