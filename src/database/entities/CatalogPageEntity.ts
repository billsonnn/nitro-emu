import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogItemEntity } from './CatalogItemEntity';

@Entity('catalog_pages')
export class CatalogPageEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'parent_id', nullable: true })
    public parentId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'caption', nullable: true })
    public caption: string;

    @Column({ name: 'icon_image', default: '0' })
    public iconImage: number;

    @Column({ name: 'layout' })
    public layout: string;

    @Column({ name: 'image_header', nullable: true })
    public imageHeader: string;

    @Column({ name: 'image_teaser', nullable: true })
    public imageTeaser: string;

    @Column({ name: 'image_special', nullable: true })
    public imageSpecial: string;

    @Column({ name: 'text_header', type: 'text', nullable: true })
    public textHeader: string;

    @Column({ name: 'text_details', type: 'text', nullable: true })
    public textDetails: string;

    @Column({ name: 'text_teaser', type: 'text', nullable: true })
    public textTeaser: string;

    @Column({ name: 'min_rank', nullable: true })
    public minRank: number;

    @Column({ name: 'is_visible', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public isVisible: number;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => CatalogPageEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'parent_id' })
    public parent: CatalogPageEntity;
    
    @OneToMany(type => CatalogPageEntity, children => children.parent)
    public children: CatalogPageEntity[];

    @OneToMany(type => CatalogItemEntity, items => items.page)
    public items: CatalogItemEntity[];
}