import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces';

export class StringDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.STRING_KEY;

    private static STATE: number = 0;
    
    private _data: string[];

    constructor()
    {
        super();

        this._data = [];
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        let results: string[] = [];

        let strings = data && data.data as string[];

        if(strings === undefined) strings = [];

        if(strings.length) for(let [ key, string ] of strings.entries()) results[key] = string.toString();

        if(results[StringDataType.STATE] === undefined) results[StringDataType.STATE] = '';

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
        const state = this._data[StringDataType.STATE];

        if(state === undefined) return '';
        
        return state;
    }

    public getValue(index: number): string
    {
        const value = this._data[index];

        if(value === undefined) return '';
        
        return value;
    }

    public setState(data: string): void
    {
        this._data[StringDataType.STATE] = data;
    }
}