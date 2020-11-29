
export interface IFurnitureData
{
    initializeFromFurnitureData(data: any): boolean;
    getAsObject(): any;
    getMessageArray(): any[];
    getLegacyString(): string;
    setState(data: string): void;
    state: number;
    isUnique: boolean;
    uniqueNumber: number;
    uniqueSeries: number;
    flags: number;
}