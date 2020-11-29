import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupForumThreadEntity } from './GroupForumThreadEntity';
import { UserEntity } from './UserEntity';

@Entity('group_forum_posts')
export class GroupForumPostEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'thread_id' })
    public threadId: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'message' })
    public message: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => GroupForumThreadEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'thread_id' })
    public thread: GroupForumThreadEntity;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}