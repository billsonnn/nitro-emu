import { FurnitureWiredSaveEvent } from '../../../../../../app';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredLogic } from '../FurnitureWiredLogic';

export class FurnitureWiredData
{
    private static MAX_FURNITURE: number = 5;

    private _id: number;
    private _spriteId: number;
    private _wiredType: number;
    private _selectionEnabled: boolean;
    private _furnitureLimit: number;
    private _furnitureIds: number[];
    private _stringParameter: string;
    private _intParameters: number[];

    constructor()
    {
        this._id                = 0;
        this._spriteId          = 0;
        this._wiredType         = 0;
        this._selectionEnabled  = false;
        this._furnitureLimit    = FurnitureWiredData.MAX_FURNITURE;
        this._furnitureIds      = [];
        this._stringParameter   = '';
        this._intParameters     = [];
    }

    public initializeFromFurnitureWiredData(data: any): boolean
    {
        let furnitureIds: number[]  = (data && data.furnitureIds) || [];
        let stringParameter: string = (data && data.string) || '';
        let intParameters: number[] = (data && data.ints) || [];

        if(furnitureIds === undefined) furnitureIds     = [];
        if(!stringParameter) stringParameter            = '';
        if(intParameters === undefined) intParameters   = [];

        this._furnitureIds      = furnitureIds;
        this._stringParameter   = stringParameter.trim();
        this._intParameters     = intParameters;

        return true;
    }

    public initializeFromIncomingMessage(message: FurnitureWiredSaveEvent): boolean
    {
        this._furnitureIds      = message.getParser().itemIds;
        this._intParameters     = message.getParser().intParameters;
        this._stringParameter   = message.getParser().stringParameter.trim();

        return true;
    }

    public setFurniture(furniture: IFurniture): boolean
    {
        if(!furniture || !(furniture.logic instanceof FurnitureWiredLogic)) return false;

        this._id        = furniture.id;
        this._spriteId  = (furniture.logic && furniture.logic.definition.spriteId) || 0;
        this._wiredType = furniture.logic.wiredType;

        return true;
    }

    public getAsObject(): any
    {
        return {
            furnitureIds: this._furnitureIds,
            string: this._stringParameter,
            ints: this._intParameters
        };
    }

    public getMessageArray(): any[]
    {
        return [
            this._selectionEnabled,
            this._furnitureLimit,
            this._furnitureIds.length, ...this._furnitureIds,
            this._spriteId,
            this._id,
            this._stringParameter,
            this._intParameters.length, ...this._intParameters,
            0, //selection code
            this._wiredType
        ];
    }

    public get id(): number
    {
        return this._id;
    }

    public get spriteId(): number
    {
        return this._spriteId;
    }

    public get wiredType(): number
    {
        return this._wiredType;
    }

    public get furnitureLimit(): number
    {
        return this._furnitureLimit;
    }

    public get furnitureIds(): number[]
    {
        return this._furnitureIds;
    }

    public set furnitureIds(ids: number[])
    {
        this._furnitureIds = ids;
    }

    public get stringParameter(): string
    {
        return this._stringParameter;
    }

    public get intParameters(): number[]
    {
        return this._intParameters;
    }
}