import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SecurityPermissionEntity } from './SecurityPermissionEntity';
import { UserEntity } from './UserEntity';

@Entity('security_ranks')
export class SecurityRankEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'permission_id', nullable: true })
    public permissionId: number;

    @Column({ name: 'client_rank', nullable: true })
    public clientRank: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => SecurityPermissionEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'permission_id' })
    public permission: SecurityPermissionEntity;

    @OneToMany(type => UserEntity, users => users.rank)
    public users: UserEntity[];
}