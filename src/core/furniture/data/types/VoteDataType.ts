import { FurnitureDataBase } from '../FurnitureDataBase';
import { FurnitureDataKey } from '../FurnitureDataKey';
import { IFurnitureData } from '../interfaces';

export class VoteDataType extends FurnitureDataBase implements IFurnitureData
{
    public static FORMAT_KEY = FurnitureDataKey.VOTE_KEY;

    private _state: string;
    private _result: number;

    constructor()
    {
        super();

        this._state     = '';
        this._result    = 0;
    }

    public initializeFromFurnitureData(data: any): boolean
    {
        if(!super.initializeFromFurnitureData(data)) return false;

        let state   = data && data.state;
        let result  = data && data.result;

        if(state === undefined) state = '';
        if(result === undefined) result = 0;

        this._state     = state.toString();
        this._result    = parseInt(result);

        return true;
    }

    public getAsObject(): any
    {
        return {
            data: {
                state: this._state,
                result: this._result
            },
            ...super.getAsObject()
        };
    }

    public getMessageArray(): any[]
    {
        return [
            this.flags,
            this._state,
            this._result,
            ...super.getMessageArray()
        ];
    }

    public getLegacyString(): string
    {
        return this._state;
    }
    
    public setState(state: string): void
    {
        this._state = state;
    }

    public get result(): number
    {
        return this._result;
    }
}