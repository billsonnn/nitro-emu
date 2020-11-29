import { IRoom } from '../interfaces';
import { RoomGameEnum } from './enums';
import { IRoomGame } from './interfaces';
import { RoomGame } from './RoomGame';
import { BattleBanzaiGame } from './types';

export class RoomGameFactory
{
    public static createGameInstance(type: number, room: IRoom): IRoomGame
    {
        const gameType = this.getGameByType(type);

        if(!gameType) return null;

        return new gameType(type, room);
    }

    public static getGameByType(type: number): typeof RoomGame
    {
        if(!type) return null;

        let game: typeof RoomGame = null;

        switch(type)
        {
            case RoomGameEnum.BATTLE_BANZAI:
                game = BattleBanzaiGame;
                break;
        }

        if(!game)
        {
            console.log(`Invalid Game: ${ type }`);
            
            return null;
        }

        return game;
    }
}