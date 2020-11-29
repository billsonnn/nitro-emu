import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupEntity } from './GroupEntity';
import { GroupForumPostEntity } from './GroupForumPostEntity';
import { UserEntity } from './UserEntity';

@Entity('group_forum_threads')
export class GroupForumThreadEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'group_id' })
    public groupId: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'subject' })
    public subject: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => GroupEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    public group: GroupEntity;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @OneToMany(type => GroupForumPostEntity, post => post.thread)
    public posts: GroupForumPostEntity[];

    public lastPost: GroupForumPostEntity;
}