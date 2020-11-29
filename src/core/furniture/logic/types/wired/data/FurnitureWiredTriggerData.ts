import { FurnitureWiredSaveTriggerEvent } from '../../../../../../app';
import { FurnitureWiredData } from './FurnitureWiredData';

export class FurnitureWiredTriggerData extends FurnitureWiredData
{
    private _conflicts: number[];

    constructor()
    {
        super();

        this._conflicts = [];
    }

    public initializeFromIncomingMessage(message: FurnitureWiredSaveTriggerEvent): boolean
    {
        if(!(message instanceof FurnitureWiredSaveTriggerEvent)) return false;
        
        if(!super.initializeFromIncomingMessage(message)) return false;

        return true;
    }

    public getAsObject(): any
    {
        return {
            conflicts: this._conflicts,
            ...super.getAsObject()
        };
    }

    public getMessageArray(): any[]
    {
        return [
            ...super.getMessageArray(),
            this._conflicts.length, ...this._conflicts
        ];
    }

    public get conflicts(): number[]
    {
        return this._conflicts;
    }
}