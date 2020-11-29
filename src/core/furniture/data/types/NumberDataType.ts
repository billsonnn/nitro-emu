import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces';

export class NumberDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.NUMBER_KEY;

    private static STATE: number = 0;
    
    private _data: number[];

    constructor()
    {
        super();

        this._data = [];
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        let results: number[] = [];

        let numbers = data && data.data as number[];

        if(numbers === undefined) numbers = [];

        if(numbers.length) for(let [ key, number ] of numbers.entries()) results[key] = parseInt(number as any);

        if(results[NumberDataType.STATE] === undefined) results[NumberDataType.STATE] = 0;

        this._data = results;

        return true;
    }

    public getAsObject(): any
    {
        return {
            data: this._data,
            ...super.getAsObject()
        };
    }

    public getMessageArray(): any[]
    {
        const data: any[] = [ this.flags, this._data.length ];

        for(let value of this._data.values()) data.push(value);

        data.push(...super.getMessageArray());

        return data;
    }

    public getLegacyString(): string
    {
        const state = this._data[NumberDataType.STATE];

        if(state === undefined) return '';
        
        return state.toString();
    }

    public getValue(index: number): number
    {
        const value = this._data[index];

        if(value === undefined) return -1;
        
        return value;
    }

    public setState(data: string): void
    {
        this._data[NumberDataType.STATE] = parseInt(data);
    }
}