import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { GroupEntity } from './GroupEntity';
import { UserEntity } from './UserEntity';

@Entity('group_members')
@Unique(['userId', 'groupId'])
export class GroupMemberEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'group_id' })
    public groupId: number;

    @Column({ name: 'rank', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '2' })
    public rank: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @ManyToOne(type => GroupEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    public group: GroupEntity;
}