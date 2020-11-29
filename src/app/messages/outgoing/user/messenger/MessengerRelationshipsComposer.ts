import { NumberHelper } from '../../../../../common';
import { MessengerFriend } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class MessengerRelationshipsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(userId: number, relationships: Map<number, MessengerFriend[]>)
    {
        let totalRelationships = 0;

        const types: any[] = [];

        if(relationships)
        {
            for(let [ type, friends ] of relationships)
            {
                const relationship = this.composeRelationship(type, friends);

                if(!relationship || !relationship.length) continue;

                totalRelationships++;

                types.push(...relationship);
            }
        }

        this._data = [ userId, totalRelationships, ...types ];
    }

    private composeRelationship(type: number, friends: MessengerFriend[]): any[]
    {
        if(!friends || !friends.length) return null;

        const data: any[] = [ type, friends.length ];

        const randomFriend = NumberHelper.getRandomValue(friends);

        if(randomFriend) data.push(randomFriend.id, randomFriend.username, randomFriend.figure);
        else data.push(0, null, null);

        return data;
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