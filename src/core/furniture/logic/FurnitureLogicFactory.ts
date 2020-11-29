import { FurnitureLogicType } from './FurnitureLogicType';
import { IFurnitureLogic } from './interfaces';
import { FurnitureBattleBanzaiGateBlueLogic, FurnitureBattleBanzaiGateGreenLogic, FurnitureBattleBanzaiGateRedLogic, FurnitureBattleBanzaiGateYellowLogic, FurnitureBattleBanzaiScoreboardBlueLogic, FurnitureBattleBanzaiScoreboardGreenLogic, FurnitureBattleBanzaiScoreboardRedLogic, FurnitureBattleBanzaiScoreboardYellowLogic, FurnitureBattleBanzaiSphereLogic, FurnitureBattleBanzaiTeleportLogic, FurnitureBattleBanzaiTileLogic, FurnitureBattleBanzaiTimerLogic, FurnitureDiceLogic, FurnitureExchangeLogic, FurnitureGateLogic, FurnitureLogic, FurnitureMultiHeightLogic, FurnitureRollerLogic, FurnitureStackHelperLogic, FurnitureWiredActionCallStacksLogic, FurnitureWiredActionChaseLogic, FurnitureWiredActionFleeLogic, FurnitureWiredActionMoveRotateLogic, FurnitureWiredActionMoveToDirectionLogic, FurnitureWiredActionResetTimersLogic, FurnitureWiredActionTeleportLogic, FurnitureWiredActionToggleFurniStateLogic, FurnitureWiredConditionOnFurniLogic, FurnitureWiredTriggerAtGivenTimeLogic, FurnitureWiredTriggerBotReachesAvatarLogic, FurnitureWiredTriggerBotReachesFurniLogic, FurnitureWiredTriggerCollisionLogic, FurnitureWiredTriggerEnterRoomLogic, FurnitureWiredTriggerGameEndsLogic, FurnitureWiredTriggerGameStartsLogic, FurnitureWiredTriggerPeriodicallyLogic, FurnitureWiredTriggerPeriodicallyLongLogic, FurnitureWiredTriggerSaysSomethingLogic, FurnitureWiredTriggerScoreAchievedLogic, FurnitureWiredTriggerStateChangeLogic, FurnitureWiredTriggerWalksOffFurniLogic, FurnitureWiredTriggerWalksOnFurniLogic } from './types';

export class FurnitureLogicFactory
{
    public static createLogicInstance(type: string): IFurnitureLogic
    {
        const logicType = this.getLogicByType(type);

        if(!logicType) return null;

        return new logicType();
    }

    public static getLogicByType(type: string): typeof FurnitureLogic
    {
        if(!type) return null;

        let logic: typeof FurnitureLogic = null;

        switch(type)
        {
            case FurnitureLogicType.FURNITURE_DEFAULT:
                logic = FurnitureLogic;
                break;
            case FurnitureLogicType.FURNITURE_ROLLER:
                logic = FurnitureRollerLogic;
                break;
            case FurnitureLogicType.FURNITURE_MULTIHEIGHT:
                logic = FurnitureMultiHeightLogic;
                break;
            case FurnitureLogicType.FURNITURE_GATE:
                logic = FurnitureGateLogic;
                break;
            case FurnitureLogicType.FURNITURE_STACKHELPER:
                logic = FurnitureStackHelperLogic;
                break;
            case FurnitureLogicType.FURNITURE_DICE:
                logic = FurnitureDiceLogic;
                break;
            case FurnitureLogicType.FURNITURE_EXCHANGE:
                logic = FurnitureExchangeLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_GATE_BLUE_LOGIC:
                logic = FurnitureBattleBanzaiGateBlueLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_GATE_GREEN_LOGIC:
                logic = FurnitureBattleBanzaiGateGreenLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_GATE_RED_LOGIC:
                logic = FurnitureBattleBanzaiGateRedLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_GATE_YELLOW_LOGIC:
                logic = FurnitureBattleBanzaiGateYellowLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_SCOREBOARD_BLUE_LOGIC:
                logic = FurnitureBattleBanzaiScoreboardBlueLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_SCOREBOARD_GREEN_LOGIC:
                logic = FurnitureBattleBanzaiScoreboardGreenLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_SCOREBOARD_RED_LOGIC:
                logic = FurnitureBattleBanzaiScoreboardRedLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_SCOREBOARD_YELLOW_LOGIC:
                logic = FurnitureBattleBanzaiScoreboardYellowLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_SPHERE_LOGIC:
                logic = FurnitureBattleBanzaiSphereLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_TIMER_LOGIC:
                logic = FurnitureBattleBanzaiTimerLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_TILE_LOGIC:
                logic = FurnitureBattleBanzaiTileLogic;
                break;
            case FurnitureLogicType.FURNITURE_BB_TELEPORT_LOGIC:
                logic = FurnitureBattleBanzaiTeleportLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_CALL_STACKS:
                logic = FurnitureWiredActionCallStacksLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_CHASE:
                logic = FurnitureWiredActionChaseLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_FLEE:
                logic = FurnitureWiredActionFleeLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_MOVE_ROTATE:
                logic = FurnitureWiredActionMoveRotateLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_MOVE_TO_DIRECTION:
                logic = FurnitureWiredActionMoveToDirectionLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_RESET_TIMERS:
                logic = FurnitureWiredActionResetTimersLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_TELEPORT_TO:
                logic = FurnitureWiredActionTeleportLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_ACTION_TOGGLE_FURNI_STATE:
                logic = FurnitureWiredActionToggleFurniStateLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_CONDITION_ON_FURNI:
                logic = FurnitureWiredConditionOnFurniLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_AT_GIVEN_TIME:
                logic = FurnitureWiredTriggerAtGivenTimeLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_BOT_REACHED_AVATAR:
                logic = FurnitureWiredTriggerBotReachesAvatarLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_BOT_REACHED_STUFF:
                logic = FurnitureWiredTriggerBotReachesFurniLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_COLLISION:
                logic = FurnitureWiredTriggerCollisionLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_ENTER_ROOM:
                logic = FurnitureWiredTriggerEnterRoomLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_GAME_ENDS:
                logic = FurnitureWiredTriggerGameEndsLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_GAME_STARTS:
                logic = FurnitureWiredTriggerGameStartsLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_PERIODICALLY:
                logic = FurnitureWiredTriggerPeriodicallyLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_PERIODICALLY_LONG:
                logic = FurnitureWiredTriggerPeriodicallyLongLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_SAYS_SOMETHING:
                logic = FurnitureWiredTriggerSaysSomethingLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_SCORE_ACHIEVED:
                logic = FurnitureWiredTriggerScoreAchievedLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_STATE_CHANGED:
                logic = FurnitureWiredTriggerStateChangeLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_WALKS_OFF_FURNI:
                logic = FurnitureWiredTriggerWalksOffFurniLogic;
                break;
            case FurnitureLogicType.FURNITURE_WIRED_TRIGGER_WALKS_ON_FURNI:
                logic = FurnitureWiredTriggerWalksOnFurniLogic;
                break;
        }

        if(!logic)
        {
            console.log(`Invalid Logic: ${ type }`);
            
            return null;
        }

        return logic;
    }
}