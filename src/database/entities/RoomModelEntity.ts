import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './RoomEntity';

@Entity('room_models')
export class RoomModelEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name', unique: true })
    public name: string;

    @Column({ name: 'door_x' })
    public doorX: number;

    @Column({ name: 'door_y' })
    public doorY: number;

    @Column({ name: 'door_direction', type: 'enum', enum: [ 0, 1, 2, 3, 4, 5, 6, 7 ], default: '4' })
    public doorDirection: number;

    @Column({ name: 'model', type: 'text' })
    public model: string;

    @Column({ name: 'enabled', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public enabled: number;

    @Column({ name: 'custom', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public custom: number;

    @OneToMany(type => RoomEntity, rooms => rooms.model)
    public rooms: RoomEntity[];
}