import { FurnitureWallEntity } from '../../../database';
import { IRoom } from '../../room';
import { Furniture } from '../Furniture';
import { IFurnitureManager } from '../interfaces';
import { FurnitureLogicFactory, FurnitureLogicType } from '../logic';

export class FurnitureWall extends Furniture
{
    private _position: string;

    constructor(manager: IFurnitureManager, entity: FurnitureWallEntity)
    {
        super(manager, entity);

        this._position = this.entity.position;

        if(!this.setLogic()) throw new Error('invalid_logic');
    }

    protected onDispose(): void
    {
        super.onDispose();
    }
    
    protected setLogic(): boolean
    {
        if(this.logic) return true;

        const definition = this.manager.getWallDefinition(this.entity.definitionId);

        if(!definition) return false;

        let logic = FurnitureLogicFactory.createLogicInstance(definition.logicType);

        if(!logic)
        {
            logic = FurnitureLogicFactory.createLogicInstance(FurnitureLogicType.FURNITURE_DEFAULT);

            if(!logic) return false;
        }

        logic.setFurniture(this);

        if(!logic.initialize(definition)) return false;

        this._logic = logic;

        return true;
    }

    public save(queue: boolean = true): void
    {
        this.entity.position = this._position || null;

        super.save(queue);
    }

    public isValidPlacement(position: string, room: IRoom = null): boolean
    {
        if(!position) return false;

        room = room !== null ? room : this.room;

        return true;
    }

    public get entity(): FurnitureWallEntity
    {
        return super.entity as FurnitureWallEntity;
    }

    public get position(): string
    {
        return this._position;
    }

    public set position(position: string)
    {
        this._position = position;
    }
}