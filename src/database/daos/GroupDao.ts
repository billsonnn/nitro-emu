import { Equal } from 'typeorm';
import { Application } from '../../app';
import { GroupRank } from '../../core/group';
import { GroupEntity, GroupForumPostEntity, GroupForumThreadEntity } from '../entities';
import { GroupMemberEntity } from '../entities/GroupMemberEntity';

export class GroupDao
{
    public static async loadGroup(id: number): Promise<GroupEntity>
    {
        if(!id) return null;

        const result = await Application.instance.core.database.entityManager
            .createQueryBuilder(GroupEntity, 'group')
            .select(['group', 'room.id', 'room.name', 'user.id', 'user.username' ])
            .where('group.id = :id', { id })
            .leftJoin('group.room', 'room')
            .innerJoin('group.user', 'user')
            .loadRelationCountAndMap('group.totalMembers', 'group.members', 'member', qb => qb.andWhere('member.rank IN (:rank)', { rank: [ GroupRank.OWNER.toString(), GroupRank.ADMIN.toString(), GroupRank.MEMBER.toString() ] }))
            .loadRelationCountAndMap('group.totalMembersPending', 'group.members', 'memberPending', qb => qb.andWhere('memberPending.rank = :rank', { rank: GroupRank.REQUESTED.toString() }))
            .getOne();

        if(!result) return null;
        
        return result;
    }

    public static async getGroupIdByRoomId(roomId: number): Promise<number>
    {
        if(!roomId) return null;

        const result = await Application.instance.core.database.entityManager
            .createQueryBuilder(GroupEntity, 'group')
            .select(['group.id', 'group.roomId' ])
            .where('group.roomId = :roomId', { roomId })
            .getOne();

        if(!result) return null;

        return result.id;
    }

    public static async getTotalPendingByGroupId(id: number): Promise<number>
    {
        if(!id) return null;

        const result = await Application.instance.core.database.entityManager
            .count(GroupMemberEntity, {
                where: {
                    groupId: id,
                    rank: Equal(GroupRank.REQUESTED.toString())
                }
            });

        if(!result) return 0;

        return result;
    }

    public static async getMembersByGroupId(id: number, pageId: number, search: string, adminOnly: boolean = false, requestsOnly: boolean = false): Promise<[GroupMemberEntity[], number]>
    {
        if(!id || pageId === null) return null;

        let query = Application.instance.core.database.entityManager
            .createQueryBuilder(GroupMemberEntity, 'member')
            .select(['member', 'user.id', 'user.username', 'user.figure' ])
            .where('member.groupId = :id', { id });

        if(search) query = query
            .andWhere('user.username LIKE :search', { search: search + '%' });

        if(adminOnly) query = query
            .andWhere('member.rank = :rank', { rank: GroupRank.OWNER.toString() })
            .orWhere('member.rank = :rank', { rank: GroupRank.ADMIN.toString() });

        else if(requestsOnly) query = query
            .andWhere('member.rank = :rank', { rank: GroupRank.REQUESTED.toString() });

        else query = query
            .andWhere('member.rank != :rank', { rank: GroupRank.REQUESTED.toString() });

        const results = await query
            .innerJoin('member.user', 'user')
            .take(14)
            .skip(pageId * 14)
            .getManyAndCount();

        if(!results || !results.length) return null;

        return results;
    }

    public static async getMembershipsByUserId(userId: number): Promise<GroupMemberEntity[]>
    {
        if(!userId) return null;

        const results = await Application.instance.core.database.entityManager
            .find(GroupMemberEntity, { where: { userId } });

        if(!results || !results.length) return null;
        
        return results;
    }

    public static async getMembershipByGroupId(groupId: number, userId: number): Promise<GroupMemberEntity>
    {
        if(!groupId || !userId) return null;

        const result = await Application.instance.core.database.entityManager
            .findOne(GroupMemberEntity, { where: { groupId, userId } });

        if(!result) return null;

        return result;
    }

    public static async addMembership(groupId: number, userId: number, rank: number): Promise<GroupMemberEntity>
    {
        if(!groupId || !userId) return null;

        const entity = new GroupMemberEntity();

        entity.groupId  = groupId;
        entity.userId   = userId;
        entity.rank     = rank;

        await Application.instance.core.database.entityManager.save(entity);

        return entity;
    }

    public static async updateMembership(groupId: number, userId: number, rank: number): Promise<void>
    {
        if(!groupId || !userId) return null;

        await Application.instance.core.database.entityManager
            .update(GroupMemberEntity, {
                groupId,
                userId
            }, { rank });
    }

    public static async removeMembership(groupId: number, userId: number): Promise<void>
    {
        if(!groupId || !userId) return;

        await Application.instance.core.database.entityManager
            .delete(GroupMemberEntity, { groupId, userId });
    }

    public static async getThreadsByGroupId(id: number, offset: number): Promise<[GroupForumThreadEntity[], number]>
    {
        if(!id || offset === null) return null;

        const results = await Application.instance.core.database.entityManager
            .createQueryBuilder(GroupForumThreadEntity, 'thread')
            .select(['thread', 'user.id', 'user.username', 'user.figure', 'user.motto' ])
            .where('thread.groupId = :id', { id })
            .innerJoin('thread.user', 'user')
            .innerJoinAndMapOne('thread.lastPost', GroupForumPostEntity, 'post', null)
            .innerJoin('post.user', 'thread.lastPost.user')
            .take(20)
            .skip(offset)
            .getManyAndCount();

        if(!results || !results.length) return null;

        return results;
    }
}