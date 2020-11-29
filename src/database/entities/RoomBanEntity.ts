import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RoomEntity } from './RoomEntity';
import { UserEntity } from './UserEntity';

@Entity('room_bans')
@Unique(['userId', 'roomId'])
export class RoomBanEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'room_id' })
    public roomId: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @Column({ name: 'timestamp_expires', default: () => 'CURRENT_TIMESTAMP' })
    public timestampExpires: Date;

    @ManyToOne(type => RoomEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id' })
    public room: RoomEntity;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}