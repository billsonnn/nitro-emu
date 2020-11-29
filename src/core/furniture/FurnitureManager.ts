import { NitroManager } from '../../common';
import { FurnitureDefinitionDao, FurnitureEntity } from '../../database';
import { INitroCore } from '../interfaces';
import { IUser } from '../user';
import { FurnitureDefinition, IFurnitureDefinition } from './definition';
import { Furniture } from './Furniture';
import { IFurniture, IFurnitureManager } from './interfaces';

export class FurnitureManager extends NitroManager implements IFurnitureManager
{
    private _core: INitroCore;

    private _definitions: Map<number, IFurnitureDefinition>;

    constructor(core: INitroCore)
    {
        super();

        if(!core) throw new Error('invalid_core');

        this._core          = core;

        this._definitions   = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadDefinitions();
    }

    protected async onDispose(): Promise<void>
    {
        this._definitions.clear();
    }

    public getDefinition(id: number): IFurnitureDefinition
    {
        if(!id) return null;

        const existing = this._definitions.get(id);

        if(!existing) return null;

        return existing;
    }

    public async createFurniture(user: IUser, definitionId: number, extraData: any = null): Promise<IFurniture>
    {
        if(!user || !definitionId) return null;

        const definition = this.getDefinition(definitionId);

        if(!definition) return null;

        const entity = new FurnitureEntity();

        entity.definitionId = definition.id;
        entity.extraData    = JSON.stringify(extraData);

        try
        {
            const furniture = new Furniture(this, entity);

            if(!furniture || !furniture.setOwner(user)) return null;

            await furniture.saveNow();

            return furniture;
        }

        catch(err)
        {
            this.logger.error(err.message || err, err.stack);

            return null;
        }
    }

    private async loadDefinitions(): Promise<void>
    {
        this._definitions.clear();

        const results = await FurnitureDefinitionDao.loadItems();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const definition = new FurnitureDefinition(result);

                if(!definition) continue;

                this._definitions.set(definition.id, definition);
            }
        }

        this.logger.log(`Loaded ${ this._definitions.size } furniture definitions`);
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get definitions(): Map<number, IFurnitureDefinition>
    {
        return this._definitions;
    }
}