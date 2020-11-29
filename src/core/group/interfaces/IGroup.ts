import { INitroManager } from '../../../common';
import { IRoom } from '../../room';
import { GroupDetails } from '../GroupDetails';
import { GroupManager } from '../GroupManager';
import { GroupMember } from '../GroupMember';

export interface IGroup extends INitroManager
{
    tryDispose(): void;
    cancelDispose(): void;
    updateLastAccess(): void;
    addActiveMember(member: GroupMember): void;
    removeActiveMember(userId: number): void;
    setRoom(room: IRoom): void;
    manager: GroupManager;
    id: number;
    room: IRoom;
    details: GroupDetails;
}