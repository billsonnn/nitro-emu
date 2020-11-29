import { FurnitureDefinitionType, IFurniture } from '../../../../../core';

export class FurnitureComposerUtilities
{
    public static composeFurnitureAsInventory(furniture: IFurniture): any[]
    {
        if(!furniture) return null;

        const data: any[] = [];

        const logic = furniture.logic;

        if(!logic || !logic.definition) return null;

        const definition = logic.definition;

        data.push(furniture.id, definition.type, furniture.id, definition.spriteId)

        switch(definition.productName)
        {
            case 'floor':
                break;
            case 'landscape':
                break;
            case 'wallpaper':
                break;
            case 'poster':
                break;
            default:
                data.push(1, ...this.composeFurnitureData(furniture));
                break;
        }

        const isUnique = (furniture.logic.data.isUnique) || false;

        let secondsToExpiration = 0;
        let hasRentPeriodStarted = true;
        let roomId = -1;

        data.push(definition.canRecycle, definition.canTrade, (isUnique ? false : definition.canInventoryStack), definition.canSell, secondsToExpiration, hasRentPeriodStarted, roomId);

        let slotId = null;

        if(definition.type === FurnitureDefinitionType.FLOOR) data.push(slotId, 1);

        return data;
    }

    public static composeFurniture(furniture: IFurniture, updateType: number = 0): any[]
    {
        if(!furniture) return null;

        const data: any[] = [];

        const logic = furniture.logic;

        if(!logic || !logic.definition) return null;

        if(logic.definition.type === FurnitureDefinitionType.FLOOR)
        {
            data.push(...this.composeFurnitureFloorData(furniture), updateType, ...this.composeFurnitureData(furniture));
        }

        else if(logic.definition.type === FurnitureDefinitionType.WALL)
        {
            data.push(...this.composeFurnitureWallData(furniture));
        }

        data.push(-1, (logic.definition.canToggle ? 1 : 0), furniture.userId);

        return data;
    }

    private static composeFurnitureFloorData(furniture: IFurniture): any[]
    {
        if(!furniture || !furniture.logic || !furniture.logic.definition) return null;

        const data: any[] = [];

        data.push(
            furniture.id,
            furniture.logic.definition.spriteId,
            furniture.position.x,
            furniture.position.y,
            furniture.position.rotation,
            furniture.position.z.toFixed(3),
            ((furniture.logic.definition.canWalk || furniture.logic.definition.canSit) ? furniture.logic.definition.stackHeight.toFixed(3) : null));

        return data;
    }

    private static composeFurnitureWallData(furniture: IFurniture): any[]
    {
        if(!furniture || !furniture.logic || !furniture.logic.definition) return null;

        const data: any[] = [];

        data.push(
            furniture.id.toString(),
            furniture.logic.definition.spriteId,
            furniture.wallPosition, // wall pos
            furniture.extraData); //extra data

        return data;
    }

    public static composeFurnitureData(furniture: IFurniture): any[]
    {
        if(!furniture || !furniture.logic || !furniture.logic.data) return null;

        return furniture.logic.data.getMessageArray();
    }
}