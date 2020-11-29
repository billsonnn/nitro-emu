import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupForumThreadEntity } from './GroupForumThreadEntity';
import { GroupMemberEntity } from './GroupMemberEntity';
import { RoomEntity } from './RoomEntity';
import { UserEntity } from './UserEntity';

@Entity('groups')
export class GroupEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'room_id', nullable: true })
    public roomId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description', nullable: true })
    public description: string;

    @Column({ name: 'badge' })
    public badge: string;

    @Column({ name: 'color_one', default: 0 })
    public colorOne: number;

    @Column({ name: 'color_two', default: 0 })
    public colorTwo: number;

    @Column({ name: 'state', type: 'enum', enum: [ 0, 1, 2 ], default: '0' })
    public state: number;

    @Column({ name: 'member_rights', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public memberRights: number;

    @Column({ name: 'forum_enabled', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public forumEnabled: number;

    @Column({ name: 'forum_read', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '0' })
    public forumRead: number;

    @Column({ name: 'forum_reply', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '0' })
    public forumReply: number;

    @Column({ name: 'forum_post', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '0' })
    public forumPost: number;

    @Column({ name: 'forum_mod', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '0' })
    public forumMod: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @OneToOne(type => RoomEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'room_id' })
    public room: RoomEntity;

    @OneToMany(type => GroupMemberEntity, member => member.group)
    public members: GroupMemberEntity[];

    @OneToMany(type => GroupForumThreadEntity, thread => thread.group)
    public threads: GroupForumThreadEntity[];

    public totalMembers: number;
    public totalMembersPending: number;
}