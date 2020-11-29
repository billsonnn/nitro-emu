import { Disposable, Position } from '../../common';
import { IPosition } from '../../common/position/IPosition';
import { IRoomObjectModel } from './IRoomObjectModel';
import { RoomObjectModel } from './RoomObjectModel';

export class RoomObject extends Disposable
{
    private static OBJECT_COUNTER: number = 0;

    private _id: number;
    private _instanceId: number;
    private _type: string;
    private _model: IRoomObjectModel;

    private _location: IPosition;
    private _direction: IPosition;

    private _updateCounter: number;

    constructor(id: number, type: string)
    {
        super();

        this._id            = id;
        this._instanceId    = RoomObject.OBJECT_COUNTER++;
        this._type          = type;
        this._model         = new RoomObjectModel();

        this._location      = new Position();
        this._direction     = new Position();

        this._updateCounter = 0;
    }

    public getLocation(): IPosition
    {
        return this._location;
    }
}