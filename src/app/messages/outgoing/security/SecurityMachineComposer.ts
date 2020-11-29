import { IMessageComposer } from '../../../../networking';

export class SecurityMachineComposer implements IMessageComposer
{
    private _data: any[];

    constructor(machine: string)
    {
        this._data = [ machine ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}