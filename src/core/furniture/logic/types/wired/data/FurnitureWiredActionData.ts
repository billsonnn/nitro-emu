import { FurnitureWiredSaveActionEvent } from '../../../../../../app';
import { FurnitureWiredData } from './FurnitureWiredData';

export class FurnitureWiredActionData extends FurnitureWiredData
{
    private _delay: number;
    private _conflicts: number[];

    constructor()
    {
        super();

        this._delay     = 0;
        this._conflicts = [];
    }

    public initializeFromFurnitureWiredData(data: any): boolean
    {
        if(!super.initializeFromFurnitureWiredData(data)) return false;

        let delay: number = (data && data.delay) || 0;

        if(delay === undefined) delay = 0;

        if(typeof delay !== 'number') delay = 0;

        this._delay = delay;

        return true;
    }

    public initializeFromIncomingMessage(message: FurnitureWiredSaveActionEvent): boolean
    {
        if(!(message instanceof FurnitureWiredSaveActionEvent)) return false;

        if(!super.initializeFromIncomingMessage(message)) return false;

        this._delay = message.getParser().delay;

        return true;
    }

    public getAsObject(): any
    {
        return {
            delay: this._delay,
            conflicts: this._conflicts,
            ...super.getAsObject()
        };
    }

    public getMessageArray(): any[]
    {
        return [
            ...super.getMessageArray(),
            this._delay,
            this._conflicts.length, ...this._conflicts
        ];
    }

    public get delay(): number
    {
        return this._delay;
    }

    public get conflicts(): number[]
    {
        return this._conflicts;
    }
}