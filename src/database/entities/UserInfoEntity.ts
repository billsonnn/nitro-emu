import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('user_info')
export class UserInfoEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'home_room', nullable: true })
    public homeRoom: number;

    @Column({ name: 'respects_received', default: '0' })
    public respectsReceived: number;

    @Column({ name: 'respects_remaining', default: '0' })
    public respectsRemaining: number;

    @Column({ name: 'respects_pet_remaining', default: '0' })
    public respectsPetRemaining: number;

    @Column({ name: 'achievement_score', default: '0' })
    public achievementScore: number;

    @Column({ name: 'friendrequests_disabled', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public friendRequestsDisabled: number;

    @Column({ name: 'toolbar_toggles', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public toolbarToggles: number;

    @Column({ name: 'volume_furni', default: '0' })
    public volumeFurni: number;

    @Column({ name: 'volume_system', default: '0' })
    public volumeSystem: number;

    @Column({ name: 'volume_trax', default: '0' })
    public volumeTrax: number;

    @Column({ name: 'old_chat', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public oldChat: number;

    @Column({ name: 'ignore_invites', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public ignoreInvites: number;

    @Column({ name: 'camera_focus', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public cameraFocus: number;

    @Column({ name: 'chat_style', default: '0' })
    public chatStyle: number;

    @Column({ name: 'navigator_x', default: '100' })
    public navigatorX: number;

    @Column({ name: 'navigator_y', default: '100' })
    public navigatorY: number;

    @Column({ name: 'navigator_width', default: '435' })
    public navigatorWidth: number;

    @Column({ name: 'navigator_height', default: '535' })
    public navigatorHeight: number;

    @Column({ name: 'navigator_search_open', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public navigatorSearchOpen: number;

    @OneToOne(type => UserEntity, user => user.info, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}