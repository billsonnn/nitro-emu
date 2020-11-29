import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SecurityRankEntity } from './SecurityRankEntity';

@Entity('security_permissions')
export class SecurityPermissionEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'permission_name' })
    public permissionName: string;

    @Column({ name: 'all_permissions', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allPermissions: number;

    @Column({ name: 'mod_tool', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public modTool: number;

    @Column({ name: 'any_room_owner', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public anyRoomOwner: number;

    @Column({ name: 'any_room_rights', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public anyRoomRights: number;

    @Column({ name: 'any_group_owner', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public anyGroupOwner: number;

    @Column({ name: 'any_group_admin', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public anyGroupAdmin: number;

    @Column({ name: 'enter_full_rooms', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public enterFullRooms: number;

    @Column({ name: 'enter_invisible_rooms', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public enterInvisibleRooms: number;

    @Column({ name: 'ignore_room_state', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public ignoreRoomState: number;

    @Column({ name: 'catalog_view_hidden', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public catalogViewHidden: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @OneToMany(type => SecurityRankEntity, ranks => ranks.permission)
    public ranks: SecurityRankEntity[];
}