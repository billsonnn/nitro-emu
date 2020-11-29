import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces/IFurnitureData';

export class EmptyDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.EMPTY_KEY;

    private _data: string;

    constructor()
    {
        super();

        this._data = '';
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        return true;
    }

    public getMessageArray(): any[]
    {
        return [
            this.flags,
            ...super.getMessageArray()
        ];
    }

    public getLegacyString(): string
    {
        return this._data;
    }
}