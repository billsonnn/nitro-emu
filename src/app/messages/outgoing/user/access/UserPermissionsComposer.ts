import { IMessageComposer } from '../../../../../networking';

export class UserPermissionsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(hasClub: boolean = false, rankId: number = 0, isAmbassador: boolean = false)
    {
        this._data = [ (hasClub ? 2 : 0), rankId, isAmbassador ];
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