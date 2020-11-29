export class RoomUnitDanceEnum
{
    public static NONE: number          = 0;
    public static DANCE: number         = 1;
    public static POGO_MOGO: number     = 2;
    public static DUCK_FUNK: number     = 3;
    public static THE_ROLLIE: number    = 4;

    public static VALID_DANCES: number[]    = [ RoomUnitDanceEnum.NONE, RoomUnitDanceEnum.DANCE, RoomUnitDanceEnum.POGO_MOGO, RoomUnitDanceEnum.DUCK_FUNK, RoomUnitDanceEnum.THE_ROLLIE ];

    public static CLUB_DANCES: number[]     = [ RoomUnitDanceEnum.POGO_MOGO, RoomUnitDanceEnum.DUCK_FUNK, RoomUnitDanceEnum.THE_ROLLIE ];
}