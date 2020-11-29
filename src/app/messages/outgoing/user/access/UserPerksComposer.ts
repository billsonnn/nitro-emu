import { IMessageComposer } from '../../../../../networking';

export class UserPerksComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [
            15,
            'USE_GUIDE_TOOL', 'requirement.unfulfilled.helper_level_4', true,
            'GIVE_GUIDE_TOURS', '', true,
            'JUDGE_CHAT_REVIEWS', 'requirement.unfulfilled.helper_level_6', true,
            'VOTE_IN_COMPETITIONS', 'requirement.unfulfilled.helper_level_2', true,
            'CALL_ON_HELPERS', '', true,
            'CITIZEN', '', true,
            'TRADE', 'requirement.unfulfilled.no_trade_lock', true,
            'HEIGHTMAP_EDITOR_BETA', 'requirement.unfulfilled.feature_disabled', true,
            'BUILDER_AT_WORK', '', true,
            'CALL_ON_HELPERS', '', true,
            'CAMERA', '', true,
            'NAVIGATOR_PHASE_TWO_2014', '', true,
            'MOUSE_ZOOM', '', true,
            'NAVIGATOR_ROOM_THUMBNAIL_CAMERA', '', true,
            'HABBO_CLUB_OFFER_BETA', '', true
        ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}