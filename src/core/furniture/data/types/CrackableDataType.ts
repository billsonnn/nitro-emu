import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces/IFurnitureData';

export class CrackableDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.CRACKABLE_KEY;
    
    private _state: string;
    private _hits: number;
    private _target: number;

    constructor()
    {
        super();

        this._state     = '';
        this._hits      = 0;
        this._target    = 0;
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        let state   = data && data.state;
        let hits    = data && data.hits;
        let target  = data && data.target;

        if(state === undefined) state = '';
        if(hits === undefined) hits = 0;
        if(target === undefined) target = 0;

        this._state     = state.toString();
        this._hits      = parseInt(hits);
        this._target    = parseInt(target);

        return true;
    }

    public getAsObject(): any
    {
        return {
            data: {
                state: this._state,
                hits: this._hits,
                target: this._target
            },
            ...super.getAsObject()
        };
    }

    public getMessageArray(): any[]
    {
        return [
            this.flags,
            this._state,
            this._hits,
            this._target,
            ...super.getMessageArray()
        ];
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public setState(data: string): void
    {
        this._state = data;
    }

    public get hits(): number
    {
        return this._hits;
    }

    public get target(): number
    {
        return this._target;
    }
}