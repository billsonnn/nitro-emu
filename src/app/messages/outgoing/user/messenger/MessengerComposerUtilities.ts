import { MessengerCategory, MessengerFriend } from '../../../../../core';
import { Short } from '../../../../../networking';

export class MessengerComposerUtilities
{
    public static composeCategories(categories: IterableIterator<MessengerCategory>): any[]
    {
        let totalCategories = 0;

        const data: any[] = [];

        if(categories)
        {
            for(let category of categories)
            {
                if(!category) continue;

                data.push(category.id, category.name);

                totalCategories++;
            }
        }

        return [ totalCategories, ...data ];
    }

    public static composeFriend(friend: MessengerFriend): any[]
    {
        return [
            friend.id,
            friend.username,
            (friend.gender === 'M' ? 0 : 1),
            friend.online,
            friend.inRoom,
            (friend.online ? friend.figure : null),
            friend.categoryId,
            friend.motto,
            null, null,
            false, // offline messaging
            false,
            false,// pocket habbo
            new Short(friend.relationship)
        ];
    }
}