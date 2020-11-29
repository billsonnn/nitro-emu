import { IRoomUnitController, RoomGameEnum } from '../../../../../../room';
import { IUser } from '../../../../../../user';
import { FurnitureLogic } from '../../../FurnitureLogic';

export class FurnitureBattleBanzaiGateLogic extends FurnitureLogic
{
    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public onStep(unit: IRoomUnitController): void
    {
        this.setTeam(unit);
    }

    private setTeam(unit: IRoomUnitController): void
    {
        if(!unit || this.teamColor() < 0) return;

        const room = this.furniture.room;

        if(!room) return;

        const game = room.game.getGame(RoomGameEnum.BATTLE_BANZAI);

        if(!game) return;

        const team = game.getTeam(this.teamColor());

        if(!team) return;
        
        team.addPlayer(unit);
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }
    
    public teamColor(): number
    {
        return -1;
    }
}