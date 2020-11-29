import { IFurniture } from '../../../furniture';
import { IRoomGame } from './IRoomGame';

export interface IRoomGameTimer
{
    game: IRoomGame;
    furniture: IFurniture;
}