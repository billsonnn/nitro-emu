import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces';

export class LegacyDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.LEGACY_KEY;
    
    private _data: string;

    constructor()
    {
        super();

        this._data = '';
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        let state = data && data.data;

        if(state === undefined || state === null || state === '') state = '0';

        this._data = state.toString();

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
        return [
            this.flags,
            this._data,
            ...super.getMessageArray()
        ];
    }

    public getLegacyString(): string
    {
        return this._data;
    }

    public setState(data: string): void
    {
        this._data = data;
    }
}