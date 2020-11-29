import { IPermission } from '../permission';
import { RankManager } from './RankManager';

export interface IRank
{
    hasPermission(permission: string): boolean;
    id: number;
    manager: RankManager;
    permission: IPermission;
    clientRank: number;
}