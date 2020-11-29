import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('navigator_tabs')
export class NavigatorTabEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name', unique: true })
    public name: string;

    @Column({ name: 'category_ids', nullable: true })
    public categoryIds: string;

    @Column({ name: 'includes', nullable: true })
    public includes: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;
}