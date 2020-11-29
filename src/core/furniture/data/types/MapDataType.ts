import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces';

export class MapDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.MAP_KEY;

    private static STATE: string = 'state';

    private _data: Map<string, string>;

    constructor()
    {
        super();

        this._data = new Map();
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        const map = data && data.data;

        if(map)
        {
            for(let key in map)
            {
                this._data.set(key.toString(), map[key].toString() || '');
            }
        }

        if(this._data.get(MapDataType.STATE) === undefined) this._data.set(MapDataType.STATE, '');

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
        const data: any[] = [ this.flags, this._data.size ];

        for(let [ key, value ] of this._data.entries()) data.push(key, value);

        data.push(...super.getMessageArray());

        return data;
    }

    public getLegacyString(): string
    {
        const state = this._data.get(MapDataType.STATE);

        if(state === undefined) return '';
        
        return state;
    }

    public getValue(key: string): string
    {
        return this._data.get(key);
    }

    public setState(data: string): void
    {
        this._data.set(MapDataType.STATE, data);
    }
}