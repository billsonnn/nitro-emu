import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FurnitureEntity } from './FurnitureEntity';
import { NavigatorCategoryEntity } from './NavigatorCategoryEntity';
import { RoomBanEntity } from './RoomBanEntity';
import { RoomModelEntity } from './RoomModelEntity';
import { RoomMuteEntity } from './RoomMuteEntity';
import { RoomRightsEntity } from './RoomRightsEntity';
import { UserEntity } from './UserEntity';
import { UserFavoriteRoomEntity } from './UserFavoriteRoomEntity';
import { UserLikedRoomEntity } from './UserLikedRoomEntity';

@Entity('rooms')
export class RoomEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description', nullable: true })
    public description: string;

    @Column({ name: 'owner_id' })
    public ownerId: number;

    @Column({ name: 'owner_name' })
    public ownerName: string;

    @Column({ name: 'state', type: 'enum', enum: [ 0, 1, 2, 3 ], default: '0' })
    public state: number;

    @Column({ name: 'password', nullable: true })
    public password: string;

    @Column({ name: 'model_id', nullable: true })
    public modelId: number;

    @Column({ name: 'category_id', nullable: true })
    public categoryId: number;

    @Column({ name: 'users_now', default: 0 })
    public usersNow: number;

    @Column({ name: 'users_max', default: 0 })
    public usersMax: number;

    @Column({ name: 'trade_type', type: 'enum', enum: [ 0, 1, 2 ], default: '0' })
    public tradeType: number;

    @Column({ name: 'paint_wall', nullable: true })
    public paintWall: number;

    @Column({ name: 'paint_floor', nullable: true })
    public paintFloor: number;

    @Column({ name: 'paint_landscape', type: 'decimal', precision: 3, scale: 2, nullable: true })
    public paintLandscape: string;

    @Column({ name: 'wall_height', default: '-1' })
    public wallHeight: number;

    @Column({ name: 'hide_walls', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public hideWalls: number;

    @Column({ name: 'thickness_wall', type: 'enum', enum: [ -2, -1, 0, 1 ], default: '0' })
    public thicknessWall: number;

    @Column({ name: 'thickness_floor', type: 'enum', enum: [ -2, -1, 0, 1 ], default: '0' })
    public thicknessFloor: number;

    @Column({ name: 'allow_editing', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public allowEditing: number;

    @Column({ name: 'allow_pets', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allowPets: number;

    @Column({ name: 'allow_pets_eat', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allowPetsEat: number;

    @Column({ name: 'allow_mute', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allowMute: number;

    @Column({ name: 'allow_kick', type: 'enum', enum: [ 0, 1, 2 ], default: '0' })
    public allowKick: number;

    @Column({ name: 'allow_ban', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allowBan: number;

    @Column({ name: 'allow_walkthrough', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public allowWalkThrough: number;

    @Column({ name: 'chat_mode', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public chatMode: number;

    @Column({ name: 'chat_weight', type: 'enum', enum: [ 0, 1, 2 ], default: '1' })
    public chatWeight: number;

    @Column({ name: 'chat_speed', type: 'enum', enum: [ 0, 1, 2 ], default: '1' })
    public chatSpeed: number;

    @Column({ name: 'chat_distance', default: '50' })
    public chatDistance: number;

    @Column({ name: 'chat_protection', type: 'enum', enum: [ 0, 1, 2 ], default: '1' })
    public chatProtection: number;

    @Column({ name: 'last_active', default: () => 'CURRENT_TIMESTAMP' })
    public lastActive: Date;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @OneToMany(type => FurnitureEntity, furniture => furniture.room)
    public furniture: FurnitureEntity[];

    @ManyToOne(type => NavigatorCategoryEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    public category: NavigatorCategoryEntity;

    @OneToMany(type => RoomBanEntity, bans => bans.room)
    public bans: RoomBanEntity[];

    @ManyToOne(type => RoomModelEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'model_id' })
    public model: RoomModelEntity;

    @OneToMany(type => RoomMuteEntity, mutes => mutes.room)
    public mutes: RoomMuteEntity[];

    @OneToMany(type => RoomRightsEntity, rights => rights.room)
    public rights: RoomRightsEntity[];

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' })
    public user: UserEntity;

    @OneToMany(type => UserFavoriteRoomEntity, userFavorites => userFavorites.room)
    public userFavorites: UserFavoriteRoomEntity[];

    @OneToMany(type => UserLikedRoomEntity, userLikes => userLikes.room)
    public userLikes: UserLikedRoomEntity[];
}