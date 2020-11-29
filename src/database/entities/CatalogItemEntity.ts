import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogPageEntity } from './CatalogPageEntity';
import { FurnitureDefinitionEntity } from './FurnitureDefinitionEntity';

@Entity('catalog_items')
export class CatalogItemEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'page_id', nullable: true })
    public pageId: number;

    @Column({ name: 'definition_id' })
    public definitionId: number;

    @Column({ name: 'product_name' })
    public productName: string;

    @Column({ name: 'offer_id', default: 0 })
    public offerId: number;

    @Column({ name: 'cost_credits', default: 0 })
    public costCredits: number;

    @Column({ name: 'cost_currency', default: 0 })
    public costCurrency: number;

    @Column({ name: 'cost_currency_type', default: 0 })
    public costCurrencyType: number;

    @Column({ name: 'amount', default: 1 })
    public amount: number;

    @Column({ name: 'unique_sells', default: 0 })
    public uniqueSells: number;

    @Column({ name: 'unique_stack', default: 0 })
    public uniqueStack: number;

    @Column({ name: 'has_offer', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public hasOffer: number;

    @Column({ name: 'club_only', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public clubOnly: number;

    @Column({ name: 'extra_data', nullable: true })
    public extraData: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @ManyToOne(type => CatalogPageEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'page_id' })
    public page: CatalogPageEntity;

    @ManyToOne(type => FurnitureDefinitionEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'definition_id' })
    public definition: FurnitureDefinitionEntity;
}