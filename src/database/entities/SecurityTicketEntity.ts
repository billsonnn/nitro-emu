import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('security_tickets')
export class SecurityTicketEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'ticket' })
    public ticket: string;

    @Column({ name: 'ip_address' })
    public ipAddress: string;

    @Column({ name: 'is_locked', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public isLocked: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @Column({ name: 'timestamp_expires', default: () => 'CURRENT_TIMESTAMP' })
    public timestampExpires: Date;

    @ManyToOne(type => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}