import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('user_statistics')
export class UserStatisticsEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'user_id' })
    public userId: number;

    @Column({ name: 'login_streak', default: '0' })
    public loginStreak: number;

    @Column({ name: 'login_streak_last', nullable: true })
    public loginStreakLast: Date;

    @Column({ name: 'login_streak_lifetime', default: '0' })
    public loginStreakLifetime: number;

    @Column({ name: 'total_seconds_online', default: '0' })
    public totalSecondsOnline: number;

    @Column({ name: 'total_logins', default: '0' })
    public totalLogins: number;

    @OneToOne(type => UserEntity, user => user.statistics, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}