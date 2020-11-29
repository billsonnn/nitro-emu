import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FurnitureDefinitionEntity } from './FurnitureDefinitionEntity';
import { RoomEntity } from './RoomEntity';
import { UserEntity } from './UserEntity';

@Entity('furniture')
export class FurnitureEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'room_id', nullable: true })
    public roomId: number;

    @Column({ name: 'definition_id' })
    public definitionId: number;

    @Column({ name: 'x', width: 2, default: '0' })
    public x: number;

    @Column({ name: 'y', width: 2, default: '0' })
    public y: number;

    @Column({ name: 'z', type: 'double', precision: 10, scale: 3, default: '0.000' })
    public z: number;

    @Column({ name: 'direction', type: 'enum', enum: [ 0, 1, 2, 3, 4, 5, 6, 7 ], default: '0' })
    public direction: number;

    @Column({ name: 'wall_position', nullable: true })
    public wallPosition: string;

    @Column({ name: 'extra_data', nullable: true })
    public extraData: string;

    @Column({ name: 'wired_data', nullable: true })
    public wiredData: string;

    @Column({ name: 'group_id', nullable: true })
    public groupId: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => FurnitureDefinitionEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'definition_id' })
    public definition: FurnitureDefinitionEntity;

    @ManyToOne(type => RoomEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'room_id' })
    public room: RoomEntity;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}