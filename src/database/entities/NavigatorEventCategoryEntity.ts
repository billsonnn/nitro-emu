import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('navigator_event_categories')
export class NavigatorEventCategoryEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name', unique: true })
    public name: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;
}