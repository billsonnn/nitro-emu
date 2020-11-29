import { Position } from '../../../../common';
import { IFurniture } from '../../../furniture';
import { IRoomGame } from './IRoomGame';

export interface IRoomGameTile
{
    game: IRoomGame;
    furniture: IFurniture;
    position: Position;
}