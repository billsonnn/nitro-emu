export class RoomUnitActionEnum
{
    public static NONE: number        = 0;
    public static WAVE: number        = 1;
    public static BLOW_KISS: number   = 2;
    public static LAUGH: number       = 3;
    public static UNKNOWN: number     = 4;
    public static IDLE: number        = 5;
    public static JUMP: number        = 6;
    public static THUMB_UP: number    = 7;

    public static VALID_ACTIONS: number[] = [ RoomUnitActionEnum.NONE, RoomUnitActionEnum.WAVE, RoomUnitActionEnum.BLOW_KISS, RoomUnitActionEnum.LAUGH, RoomUnitActionEnum.THUMB_UP ];
}