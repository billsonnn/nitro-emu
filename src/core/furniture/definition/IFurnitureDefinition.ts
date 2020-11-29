export interface IFurnitureDefinition
{
    id: number;
    publicName: string;
    productName: string;
    spriteId: number;
    type: string;
    width: number;
    length: number;
    stackHeight: number;
    logicType: string;
    totalStates: number;
    canToggle: boolean;
    canStack: boolean;
    canWalk: boolean;
    canSit: boolean;
    canLay: boolean;
    canRecycle: boolean;
    canTrade: boolean;
    canInventoryStack: boolean;
    canSell: boolean;
    extraData: string;
}