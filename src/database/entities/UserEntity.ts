import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BotEntity } from './BotEntity';
import { FurnitureEntity } from './FurnitureEntity';
import { GroupEntity } from './GroupEntity';
import { GroupForumPostEntity } from './GroupForumPostEntity';
import { GroupForumThreadEntity } from './GroupForumThreadEntity';
import { GroupMemberEntity } from './GroupMemberEntity';
import { MessengerCategoryEntity } from './MessengerCategoryEntity';
import { MessengerFriendEntity } from './MessengerFriendEntity';
import { MessengerRequestEntity } from './MessengerRequestEntity';
import { SecurityRankEntity } from './SecurityRankEntity';
import { SecurityTicketEntity } from './SecurityTicketEntity';
import { UserBadgeEntity } from './UserBadgeEntity';
import { UserClothingEntity } from './UserClothingEntity';
import { UserCurrencyEntity } from './UserCurrencyEntity';
import { UserFavoriteRoomEntity } from './UserFavoriteRoomEntity';
import { UserInfoEntity } from './UserInfoEntity';
import { UserLikedRoomEntity } from './UserLikedRoomEntity';
import { UserOutfitEntity } from './UserOutfitEntity';
import { UserStatisticsEntity } from './UserStatisticsEntity';
import { UserSubscriptionEntity } from './UserSubscriptionEntity';

@Entity('users')
export class UserEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'username', unique: true })
    public username: string;

    @Column({ name: 'password', select: false })
    public password: string;

    @Column({ name: 'email', select: false })
    public email: string;

    @Column({ name: 'motto', nullable: true })
    public motto: string;

    @Column({ name: 'gender', type: 'enum', enum: [ 'M', 'F' ], default: 'M' })
    public gender: string;

    @Column({ name: 'figure', default: 'lg-270-82.hd-180-1.ch-210-66.sh-290-81.hr-100-40' })
    public figure: string;

    @Column({ name: 'rank_id', nullable: true })
    public rankId: number;

    @Column({ name: 'online', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public online: number;

    @Column({ name: 'last_online', nullable: true })
    public lastOnline: Date;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @OneToMany(type => BotEntity, bot => bot.user)
    public bots: BotEntity[];

    @OneToMany(type => FurnitureEntity, furniture => furniture.user)
    public furniture: FurnitureEntity[];

    @OneToMany(type => GroupEntity, group => group.user)
    public groups: GroupEntity[];

    @OneToMany(type => GroupForumPostEntity, post => post.user)
    public groupForumPosts: GroupForumPostEntity[];

    @OneToMany(type => GroupForumThreadEntity, thread => thread.user)
    public groupForumThreads: GroupForumThreadEntity[];

    @OneToMany(type => GroupMemberEntity, member => member.user)
    public groupMemberships: GroupMemberEntity[];

    @OneToMany(type => MessengerCategoryEntity, category => category.user)
    public messengerCategories: MessengerCategoryEntity[];

    @OneToMany(type => MessengerFriendEntity, friend => friend.user)
    public messengerFriends: MessengerFriendEntity[];

    @OneToMany(type => MessengerRequestEntity, request => request.requested)
    public messengerRequests: MessengerRequestEntity[];

    @OneToMany(type => MessengerRequestEntity, request => request.user)
    public messengerRequestsSent: MessengerRequestEntity[];

    @ManyToOne(type => SecurityRankEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'rank_id' })
    public rank: SecurityRankEntity;

    @OneToMany(type => SecurityTicketEntity, securityTickets => securityTickets.user)
    public securityTickets: SecurityTicketEntity[];

    @OneToMany(type => UserBadgeEntity, badges => badges.user)
    public badges: UserBadgeEntity[];

    @OneToMany(type => UserClothingEntity, clothing => clothing.user)
    public clothing: UserClothingEntity[];

    @OneToMany(type => UserCurrencyEntity, currencies => currencies.user)
    public currencies: UserCurrencyEntity[];

    @OneToMany(type => UserFavoriteRoomEntity, favoriteRooms => favoriteRooms.user)
    public favoriteRooms: UserFavoriteRoomEntity[];

    @OneToOne(type => UserInfoEntity, info => info.user, { cascade: ['insert', 'update' ] })
    public info: UserInfoEntity;

    @OneToMany(type => UserLikedRoomEntity, likedRooms => likedRooms.user)
    public likedRooms: UserLikedRoomEntity[];

    @OneToMany(type => UserOutfitEntity, outfits => outfits.user)
    public outfits: UserOutfitEntity[];

    @OneToOne(type => UserStatisticsEntity, statistics => statistics.user, { cascade: ['insert', 'update' ] })
    public statistics: UserStatisticsEntity;

    @OneToMany(type => UserSubscriptionEntity, subscriptions => subscriptions.user)
    public subscriptions: UserSubscriptionEntity[];
}