import { NitroManager } from '../../common';
import { RoomEntity } from '../../database';
import { IGroup } from '../group';
import { NavigatorCategory } from '../navigator';
import { IUser } from '../user';
import { IRoom } from './interfaces';
import { RoomBotManager, RoomFurnitureManager, RoomGameManager, RoomSecurityManager, RoomUnitManager, RoomWiredManager } from './managers';
import { RoomMap, RoomModel } from './mapping';
import { RoomDetails } from './RoomDetails';
import { RoomManager } from './RoomManager';
import { RoomTaskManager } from './tasks';

export class Room extends NitroManager implements IRoom
{
    private _manager: RoomManager;

    private _id: number;
    private _details: RoomDetails;
    private _category: NavigatorCategory;
    private _group: IGroup;

    private _security: RoomSecurityManager;
    private _furniture: RoomFurnitureManager;
    private _game: RoomGameManager;
    private _unit: RoomUnitManager;
    private _bot: RoomBotManager;
    private _wired: RoomWiredManager;
    private _task: RoomTaskManager;

    private _model: RoomModel;
    private _map: RoomMap;

    private _disposeTimeout: NodeJS.Timeout;

    constructor(manager: RoomManager, entity: RoomEntity)
    {
        super();

        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof RoomEntity)) throw new Error('invalid_entity');

        this._manager           = manager;

        this._id                = entity.id;
        this._details           = new RoomDetails(this, entity);
        this._category          = null;
        this._group             = null;

        this._security          = new RoomSecurityManager(this);
        this._furniture         = new RoomFurnitureManager(this);
        this._game              = new RoomGameManager(this);
        this._unit              = new RoomUnitManager(this);
        this._bot               = new RoomBotManager(this);
        this._wired             = new RoomWiredManager(this);
        this._task              = new RoomTaskManager(this);

        this._model             = null;
        this._map               = null;

        this._disposeTimeout    = null;

        this.logger.description = this._id;

        this.setCategory();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadMapping();

        if(!this._map)
        {
            await this.dispose();

            return;
        }

        const group = await this._manager.core.group.getGroupByRoomId(this._id);

        if(group)
        {
            group.setRoom(this);

            this._group = group;
        }

        if(this._security) await this._security.init();
        if(this._furniture) await this._furniture.init();
        if(this._game) await this._game.init();
        if(this._unit) await this._unit.init();
        if(this._bot) await this._bot.init();
        if(this._wired) await this._wired.init();
        if(this._task) await this._task.init();
        
        this.logger.log(`Initialized`);
    }

    protected async onDispose(): Promise<void>
    {
        this.cancelDispose();

        await this._manager.removeRoom(this._id);

        if(this._group)
        {
            this._group.setRoom(null);

            this._group = null;
        }

        if(this._task) await this._task.dispose();
        if(this._wired) await this._wired.dispose();
        if(this._bot) await this._bot.dispose();
        if(this._unit) await this._unit.dispose();
        if(this._game) await this._game.dispose();
        if(this._furniture) await this._furniture.dispose();
        if(this._security) await this._security.dispose();
        if(this._details) await this._details.saveNow();

        this.logger.log(`Disposed`);
    }

    private setCategory(): void
    {
        this._category = null;

        const category = this._manager.core.navigator.getCategory(this._details.categoryId);

        if(category) this._category = category;
    }

    public enterRoom(user: IUser): void
    {
        if(!user) return;

        const roomId = this._manager.getPendingRoomId(user.id);

        if(!roomId || (roomId !== this._id))
        {
            this._manager.enterRoom(user, this._id);

            return;
        }

        return this._unit.enterRoom(user);
    }

    public async loadMapping(): Promise<void>
    {
        this._model = null;
        this._map   = null;

        if(!this._details || !this._details.modelId) return;

        let model: RoomModel = this._manager.getModel(this._details.modelId);

        if(!model || !model.didGenerate) return;

        this._model = model;
        this._map   = new RoomMap(this);

        this._map.generateMap();
    }

    public tryDispose(): void
    {
        if(this.isDisposed || this.isDisposing || this.isLoading) return;

        if(this._disposeTimeout) return;

        if(this._details.usersNow) return;

        this._security.clearDoorbell();

        this._disposeTimeout = setTimeout(() => this.dispose(), 60000);
    }

    public cancelDispose(): void
    {
        if(this._disposeTimeout) clearTimeout(this._disposeTimeout);

        this._disposeTimeout = null;
    }

    public get manager(): RoomManager
    {
        return this._manager;
    }

    public get id(): number
    {
        return this._id;
    }

    public get details(): RoomDetails
    {
        return this._details;
    }

    public get category(): NavigatorCategory
    {
        return this._category;
    }

    public get group(): IGroup
    {
        return this._group;
    }

    public get security(): RoomSecurityManager
    {
        return this._security;
    }

    public get furniture(): RoomFurnitureManager
    {
        return this._furniture;
    }

    public get game(): RoomGameManager
    {
        return this._game;
    }

    public get unit(): RoomUnitManager
    {
        return this._unit;
    }

    public get bot(): RoomBotManager
    {
        return this._bot;
    }

    public get wired(): RoomWiredManager
    {
        return this._wired;
    }

    public get task(): RoomTaskManager
    {
        return this._task;
    }

    public get model(): RoomModel
    {
        return this._model;
    }

    public get map(): RoomMap
    {
        return this._map;
    }
}