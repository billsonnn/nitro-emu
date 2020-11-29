import { FurnitureDataFlags } from './FurnitureDataFlags';
import { IFurnitureData } from './interfaces';

export class FurnitureDataBase implements IFurnitureData
{
    private _flags: number;
    private _uniqueNumber: number;
    private _uniqueSeries: number;

    constructor()
    {
        this._flags         = 0;
        this._uniqueNumber  = 0;
        this._uniqueSeries  = 0;
    }

    public initializeFromFurnitureData(data: any): boolean
    {        
        let uniqueNumber    = 0;
        let uniqueSeries    = 0;

        const limitedData = data && data.limited;

        if(limitedData) [ uniqueNumber, uniqueSeries ] = limitedData.split(':').map(octet => parseInt(octet, 10));

        if(uniqueNumber && uniqueSeries)
        {
            this._flags += FurnitureDataFlags.UNIQUE_SET;

            this._uniqueNumber  = uniqueNumber;
            this._uniqueSeries  = uniqueSeries;
        }

        return true;
    }

    public getMessageArray(): any[]
    {
        const data: any[] = [ ];

        if((this._flags & FurnitureDataFlags.UNIQUE_SET) > 0) data.push(this._uniqueNumber, this._uniqueSeries);

        return data;
    }

    public getAsObject(): any
    {
        return {
            limited: `${ this._uniqueNumber }:${ this._uniqueSeries }`
        };
    }

    public getLegacyString(): string
    {
        return '';
    }

    public setState(data: string): void
    {
        return;
    }

    public get state(): number
    {
        const state = parseInt(this.getLegacyString());

        return isNaN(state) ? 0 : state;
    }

    public get isUnique(): boolean
    {
        return this._uniqueSeries > 0;
    }

    public get uniqueNumber(): number
    {
        return this._uniqueNumber;
    }

    public get uniqueSeries(): number
    {
        return this._uniqueSeries;
    }

    public get flags(): number
    {
        return this._flags;
    }

    public set flags(flags: number)
    {
        this._flags = flags;
    }
}