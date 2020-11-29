import { IFurnitureData } from './interfaces';
import { CrackableDataType, EmptyDataType, LegacyDataType, MapDataType, NumberDataType, StringDataType, VoteDataType } from './types';

export class FurnitureDataFactory
{
    public static createData(flags: number): IFurnitureData
    {
        let furnitureData: IFurnitureData = null;

        switch(flags & 0xFF)
        {
            case CrackableDataType.FORMAT_KEY:
                furnitureData = new CrackableDataType();
                break;
            case EmptyDataType.FORMAT_KEY:
                furnitureData = new EmptyDataType();
                break;
            case LegacyDataType.FORMAT_KEY:
                furnitureData = new LegacyDataType();
                break;
            case MapDataType.FORMAT_KEY:
                furnitureData = new MapDataType();
                break;
            case NumberDataType.FORMAT_KEY:
                furnitureData = new NumberDataType();
                break;
            case StringDataType.FORMAT_KEY:
                furnitureData = new StringDataType();
                break;
            case VoteDataType.FORMAT_KEY:
                furnitureData = new VoteDataType();
                break;
        }

        if(!furnitureData) return null;
        
        furnitureData.flags = flags;

        return furnitureData;
    }
}