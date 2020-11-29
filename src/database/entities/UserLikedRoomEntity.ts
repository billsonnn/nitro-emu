import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RoomEntity } from './RoomEntity';
import { UserEntity } from './UserEntity';

@Entity('user_liked_rooms')
@Unique(['userId', 'roomId'])
export class UserLikedRoomEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'room_id' })
    public roomId: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @ManyToOne(type => RoomEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id' })
    public room: RoomEntity;
}