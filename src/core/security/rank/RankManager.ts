import { NitroManager } from '../../../common';
import { SecurityRankDao } from '../../../database';
import { SecurityManager } from '../SecurityManager';
import { IRank } from './IRank';
import { Rank } from './Rank';

export class RankManager extends NitroManager
{
    private _manager: SecurityManager;

    private _ranks: Map<number, IRank>;

    constructor(manager: SecurityManager)
    {
        super();

        this._manager   = manager;

        this._ranks     = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadRanks();
    }

    protected onDispose(): void
    {
        this._ranks.clear();
    }

    public getRank(rankId: number): IRank
    {
        const existing = this._ranks.get(rankId);

        if(!existing) return null;

        return existing;
    }

    private async loadRanks(): Promise<void>
    {
        this._ranks.clear();

        const results = await SecurityRankDao.loadRanks();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const rank = new Rank(this, result);

                if(!rank) continue;

                this._ranks.set(rank.id, rank);

                const permission = this._manager.permission.getPermission(result.permissionId);

                if(permission) rank.permission = permission; 
            }
        }

        this.logger.log(`Loaded ${ this._ranks.size } ranks`);
    }

    public get manager(): SecurityManager
    {
        return this._manager;
    }
}