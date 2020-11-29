import { RoomBanEnum, RoomChatModeEnum, RoomChatProtectionEnum, RoomChatSpeedEnum, RoomChatWeightEnum, RoomKickEnum, RoomMuteEnum } from '../../../../../core';
import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomSettingsSaveParser implements IMessageParser
{
    private _roomId: number;
    private _name: string;
    private _description: string;
    private _state: number;
    private _password: string;
    private _usersMax: number;
    private _categoryId: number;
    private _tags: string[];
    private _tradeType: number;
    private _allowPets: boolean;
    private _allowPetsEat: boolean;
    private _allowWalkThrough: boolean;
    private _hideWalls: boolean;
    private _thicknessWall: number;
    private _thicknessFloor: number;
    private _muteType: number;
    private _kickType: number;
    private _banType: number;
    private _chatMode: number;
    private _chatWeight: number;
    private _chatSpeed: number;
    private _chatDistance: number;
    private _chatProtection: number;

    public flush(): boolean
    {
        this._roomId            = 0;
        this._name              = null;
        this._description       = null;
        this._state             = 0;
        this._password          = null;
        this._usersMax          = 0;
        this._categoryId        = 0;
        this._tags              = [];
        this._tradeType         = 0;
        this._allowPets         = false;
        this._allowPetsEat      = false;
        this._allowWalkThrough  = false;
        this._hideWalls         = false;
        this._thicknessWall     = 0;
        this._thicknessFloor    = 0;
        this._muteType          = RoomMuteEnum.NONE;
        this._kickType          = RoomKickEnum.NONE;
        this._banType           = RoomBanEnum.NONE;
        this._chatMode          = RoomChatModeEnum.FREE_FLOW;
        this._chatWeight        = RoomChatWeightEnum.NORMAL;
        this._chatSpeed         = RoomChatSpeedEnum.NORMAL;
        this._chatDistance      = 50;
        this._chatProtection    = RoomChatProtectionEnum.NORMAL;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId            = wrapper.readInt();
        this._name              = wrapper.readString();
        this._description       = wrapper.readString();
        this._state             = wrapper.readInt();
        this._password          = wrapper.readString();
        this._usersMax          = wrapper.readInt();
        this._categoryId        = wrapper.readInt();

        this.parseTags(wrapper);

        this._tradeType         = wrapper.readInt();
        this._allowPets         = wrapper.readBoolean();
        this._allowPetsEat      = wrapper.readBoolean();
        this._allowWalkThrough  = wrapper.readBoolean();
        this._hideWalls         = wrapper.readBoolean();
        this._thicknessWall     = wrapper.readInt();
        this._thicknessFloor    = wrapper.readInt();
        this._muteType          = wrapper.readInt();
        this._kickType          = wrapper.readInt();
        this._banType           = wrapper.readInt();
        this._chatMode          = wrapper.readInt();
        this._chatWeight        = wrapper.readInt();
        this._chatSpeed         = wrapper.readInt();
        this._chatDistance      = wrapper.readInt();
        this._chatProtection    = wrapper.readInt();
        
        return true;
    }

    private parseTags(wrapper: IMessageDataWrapper): void
    {
        if(!wrapper) return;

        let totalTags = wrapper.readInt();

        while(totalTags > 0)
        {
            this._tags.push(wrapper.readString());

            totalTags--;
        }
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get state(): number
    {
        return this._state;
    }

    public get password(): string
    {
        return this._password;
    }

    public get usersMax(): number
    {
        return this._usersMax;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get tags(): string[]
    {
        return this._tags;
    }

    public get tradeType(): number
    {
        return this._tradeType;
    }

    public get allowPets(): boolean
    {
        return this._allowPets;
    }

    public get allowPetsEat(): boolean
    {
        return this._allowPetsEat;
    }

    public get allowWalkThrough(): boolean
    {
        return this._allowWalkThrough;
    }

    public get hideWalls(): boolean
    {
        return this._hideWalls;
    }

    public get thicknessWall(): number
    {
        return this._thicknessWall;
    }

    public get thicknessFloor(): number
    {
        return this._thicknessFloor;
    }

    public get muteType(): number
    {
        return this._muteType;
    }

    public get kickType(): number
    {
        return this._kickType;
    }

    public get banType(): number
    {
        return this._banType;
    }

    public get chatMode(): number
    {
        return this._chatMode;
    }

    public get chatWeight(): number
    {
        return this._chatWeight;
    }

    public get chatSpeed(): number
    {
        return this._chatSpeed;
    }

    public get chatDistance(): number
    {
        return this._chatDistance;
    }

    public get chatProtection(): number
    {
        return this._chatProtection;
    }
}