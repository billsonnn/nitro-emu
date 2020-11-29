import { RoomUnitActionComposer, RoomUnitDanceComposer, RoomUnitEffectComposer, RoomUnitHandItemComposer, RoomUnitIdleComposer } from '../../../app';
import { Position } from '../../../common';
import { IFurniture } from '../../furniture';
import { User } from '../../user';
import { RoomTile } from '../mapping';
import { PathFinder } from '../pathfinder';
import { RoomUnitActionEnum, RoomUnitDanceEnum, RoomUnitStatusEnum } from './enums';
import { IRoomUnitController, IRoomUnitLocation } from './interfaces';

export class RoomUnitLocation implements IRoomUnitLocation
{
    private _unit: IRoomUnitController;
    private _statuses: Map<string, string>;

    private _position: Position;
    private _positionNext: Position;
    private _positionGoal: Position;
    private _currentPath: Position[];
    private _isWalking: boolean;
    private _canWalk: boolean;

    private _danceType: number;
    private _effectType: number;
    private _handType: number;
    private _isIdle: boolean;

    constructor(unit: IRoomUnitController)
    {
        if(!unit) throw new Error('invalid_unit');

        this._unit = unit;

        this._statuses      = new Map();

        this._position      = null;
        this._positionNext  = null;
        this._positionGoal  = null;
        this._currentPath   = [];
        this._isWalking     = false;
        this._canWalk       = true;

        this._danceType     = 0;
        this._effectType    = 0;
        this._handType      = 0;
        this._isIdle        = false;
    }

    public dispose(): void
    {
        if(this._position)
        {
            const tile = this.getTile();

            if(tile) tile.removeUnit(this._unit);

            this._position = null;
        }

        if(this._positionNext)
        {
            const tile = this.getNextTile();

            if(tile) tile.removeUnit(this._unit);

            this._positionNext = null;
        }

        this._statuses      = new Map();
        this._positionGoal  = null;
        this._currentPath   = [];
        this._isWalking     = false;
        this._danceType     = 0;
        this._effectType    = 0;
        this._isIdle        = false;
    }

    public walkTo(position: Position): void
    {
        if(!this._canWalk) return;
        
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        this._unit.setRollerData(null);

        this.idle(false);
        
        position = position.copy();

        this.processNextPosition();

        if(this._position.compare(position)) return;
        
        const goalTile = room.map.getValidTile(this._unit, position);

        if(!goalTile) return this.stopWalking();
        
        return this.walkPath(position, PathFinder.makePath(this._unit, position));
    }

    public goTo(position: Position): void
    {
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        this._unit.setRollerData(null);

        this.idle(false);

        if(this._position.compare(position)) return;

        this.stopWalking();

        this._positionNext = position.copy();

        const tile      = this.getTile();
        const tileNext  = this.getNextTile();

        const currentFurniture  = tile.highestItem;
        const nextFurniture     = tileNext.highestItem;

        if(currentFurniture)
        {
            if(currentFurniture !== nextFurniture) currentFurniture.logic.onLeave(this._unit);
        }

        tile.removeUnit(this._unit);
        tileNext.addUnit(this._unit);

        if(nextFurniture)
        {
            nextFurniture.logic.beforeStep(this._unit);

            if(nextFurniture !== currentFurniture) nextFurniture.logic.onEnter(this._unit);
        }

        this.processNextPosition();
        this.invokeCurrentLocation();
    }

    private walkPath(goal: Position, path: Position[]): void
    {
        if(!path || !path.length) return this.stopWalking();
        
        this._positionGoal  = goal;
        this._currentPath   = path;
        this._isWalking     = true;
    }

    public processNextPosition(): void
    {
        if(!this._positionNext) return;
        
        this._position.x    = this._positionNext.x;
        this._position.y    = this._positionNext.y;
        this._positionNext  = null;

        const tile = this.getTile();

        if(tile)
        {
            if(tile.isDoor)
            {
                this._unit.dispose();

                return;
            }

            this.updateHeight(tile);

            if(tile.highestItem) tile.highestItem.logic.onStep(this._unit);
        }
        else
        {
            this.stopWalking();

            return;
        }

        this._unit.needsUpdate = true;
    }

    public updateHeight(tile: RoomTile = null): void
    {
        tile = tile ? tile : this.getTile();

        if(!tile) return;
        
        const height      = +tile.getWalkingHeight().toFixed(2);
        const oldHeight   = this._position.z;

        if(height === oldHeight) return;
        
        this._position.z        = height;
        this._unit.needsUpdate  = true;
    }

    public clearPath(): void
    {
        this._currentPath = [];
    }

    public stopWalking(): void
    {
        if(!this._isWalking) return;
        
        this.clearWalking();

        this.invokeCurrentLocation();
    }

    private clearWalking(): void
    {
        this.clearPath();

        this.processNextPosition();

        this._isWalking     = false;
        this._positionNext  = null;
        this._positionGoal  = null;

        this._unit.needsUpdate = true;

        this.removeStatus(RoomUnitStatusEnum.MOVE);
    }

    public addStatus(type: string, value: string): void
    {
        this._statuses.set(type, value);
        
        this._unit.needsUpdate = true;
    }

    public hasStatus(...types: string[]): boolean
    {
        types = [ ...types ];

        for(let type of types)
        {
            if(!type) continue;

            const existing = this._statuses.get(type);

            if(!existing) continue;

            return true;
        }

        return false;
    }

    public removeStatus(...types: string[]): void
    {
        types = [ ...types ];

        for(let type of types)
        {
            if(!type) continue;

            this._statuses.delete(type);
        }
        
        this._unit.needsUpdate = true;
    }

    public lookAtPosition(position: Position, headOnly: boolean = false, selfInvoked: boolean = true): void
    {
        if(!position || this._isWalking || this._isIdle) return;

        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(selfInvoked) this.idle(false);

        if(this._position.compare(position)) return;

        const tile = room.map.getTile(position);

        if(!tile) return;

        if(this.hasStatus(RoomUnitStatusEnum.LAY)) return;

        if(headOnly || this.hasStatus(RoomUnitStatusEnum.SIT))
        {
            this._position.headRotation = this._position.calculateHeadDirection(position);

            this._unit.timer.startLookTimer();
        }
        else this._position.setRotation(this._position.calculateHumanDirection(position));

        this._unit.needsUpdate = true;
    }

    public action(type: number = 0): void
    {
        if(!type) return;

        if(type === RoomUnitActionEnum.IDLE) return this.idle(true);
        
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(RoomUnitActionEnum.VALID_ACTIONS.indexOf(type) === -1) return;

        room.unit.processComposer(new RoomUnitActionComposer(this._unit.id, type));
    }

    public sit(flag: boolean = true, height: number = 0.50, direction: number = null): void
    {
        this.removeStatus(RoomUnitStatusEnum.SIT, RoomUnitStatusEnum.LAY);

        if(flag)
        {
            this.dance();

            direction = direction !== null ? direction : this._position.calculateSitDirection();

            this._position.setRotation(direction);
            
            this.addStatus(RoomUnitStatusEnum.SIT, height.toFixed(3));
        }
    }

    public lay(flag: boolean = true, height: number = 0.50, direction: number = null): void
    {
        this.removeStatus(RoomUnitStatusEnum.LAY, RoomUnitStatusEnum.SIT);

        if(flag)
        {
            this.dance();

            direction = direction !== null ? direction : this._position.calculateSitDirection();

            this._position.setRotation(direction);
            
            this.addStatus(RoomUnitStatusEnum.LAY, height.toFixed(3));
        }
    }

    public sign(type: number): void
    {
        if(type === null || type > 17) return;
        
        if(this.hasStatus(RoomUnitStatusEnum.LAY)) return;
        
        this.addStatus(RoomUnitStatusEnum.SIGN, type.toString());
    }

    public dance(type: number = 0): void
    {
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(this._danceType === type) return;

        if(this.hasStatus(RoomUnitStatusEnum.SIT, RoomUnitStatusEnum.LAY)) return;

        if(RoomUnitDanceEnum.VALID_DANCES.indexOf(type) === -1) return;

        if(this._unit.holder instanceof User)
        {
            if(!this._unit.holder.inventory.subscriptions.hasHabboClub())
            {
                if(RoomUnitDanceEnum.CLUB_DANCES.indexOf(type) >= 0) return;
            }
        }

        this._danceType = type;

        room.unit.processComposer(new RoomUnitDanceComposer(this._unit.id, this._danceType));
    }

    public effect(type: number = 0): void
    {
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(this._effectType === type) return;

        this._effectType = type;

        room.unit.processComposer(new RoomUnitEffectComposer(this._unit.id, this._effectType));
    }

    public hand(type: number = 0): void
    {
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(this._handType === type) return;

        this._handType = type;

        //if(hand === UnitHandItem.NONE) this._unit.timer.stopHandTimer();
        //else this._unit.timer.startHandTimer();

        room.unit.processComposer(new RoomUnitHandItemComposer(this._unit.id, this._handType));
    }

    public idle(flag: boolean = true): void
    {
        const room = this._unit && this._unit.manager && this._unit.manager.room;

        if(!room) return;

        if(!flag) this._unit.timer.startIdleTimer();
        else this._unit.timer.stopIdleTimer();

        if(this._isIdle === flag) return;

        this._isIdle = flag;

        room.unit.processComposer(new RoomUnitIdleComposer(this._unit.id, this._isIdle));
    }

    public getTile(): RoomTile
    {
        if(!this._position) return null;

        return this._unit && this._unit.manager && this._unit.manager.room && this._unit.manager.room.map.getTile(this._position) || null;
    }

    public getNextTile(): RoomTile
    {
        if(!this._positionNext) return null;

        return this._unit && this._unit.manager && this._unit.manager.room && this._unit.manager.room.map.getTile(this._positionNext) || null;
    }

    public getFurniture(): IFurniture
    {
        const tile = this.getTile();

        if(!tile) return null;

        return tile.highestItem;
    }

    public invokeCurrentLocation(): void
    {
        const furniture = this.getFurniture();

        if(!furniture || (furniture && (!furniture.logic.isFurnitureSittable() || !furniture.logic.isFurnitureLayable())))
        {
            this.sit(false);
            this.lay(false);
        }

        if(furniture && furniture.logic) furniture.logic.onStop(this._unit);

        this.updateHeight();
    }

    public get unit(): IRoomUnitController
    {
        return this._unit;
    }

    public get statuses(): Map<string, string>
    {
        return this._statuses;
    }

    public get position(): Position
    {
        return this._position;
    }

    public set position(position: Position)
    {
        this._position = position;
    }

    public get positionNext(): Position
    {
        return this._positionNext;
    }

    public set positionNext(position: Position)
    {
        this._positionNext = position;
    }

    public get positionGoal(): Position
    {
        return this._positionGoal;
    }

    public set positionGoal(position: Position)
    {
        this._positionGoal = position;
    }

    public get currentPath(): Position[]
    {
        return this._currentPath;
    }

    public get isWalking(): boolean
    {
        return this._isWalking;
    }

    public get canWalk(): boolean
    {
        return this._canWalk;
    }

    public set canWalk(flag: boolean)
    {
        this._canWalk = flag;
    }

    public get danceType(): number
    {
        return this._danceType;
    }

    public get effectType(): number
    {
        return this._effectType;
    }

    public get handType(): number
    {
        return this._handType;
    }

    public get isIdle(): boolean
    {
        return this._isIdle;
    }
}