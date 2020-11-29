import { NavigatorSearchModeEnum, NavigatorSearchResult } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { RoomDataComposerUtilities } from '../../room';

export class NavigatorSearchComposer implements IMessageComposer
{
    private _data: any[];

    constructor(tabName: string, query: string, results: NavigatorSearchResult[])
    {
        let totalResults = 0;

        const data: any[] = [];

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                let totalRooms = 0;

                const roomData: any[] = [];

                if(result.rooms)
                {
                    for(let room of result.rooms)
                    {
                        if(!room) continue;

                        roomData.push(...RoomDataComposerUtilities.composeRoomSearchInfo(room));

                        totalRooms++;
                    }
                }

                data.push(
                    result.resultQuery,
                    result.resultName,
                    result.action,
                    false, //is collapsed
                    NavigatorSearchModeEnum.LIST,
                    totalRooms,
                    ...roomData
                );

                totalResults++;
            }
        }

        this._data = [ tabName, query, totalResults, ...data ];
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