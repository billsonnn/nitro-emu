import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogItemEntity } from './CatalogItemEntity';
import { FurnitureEntity } from './FurnitureEntity';

@Entity('furniture_definition')
export class FurnitureDefinitionEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'public_name' })
    public publicName: string;

    @Column({ name: 'product_name' })
    public productName: string;

    @Column({ name: 'sprite_id' })
    public spriteId: number;

    @Column({ name: 'type', type: 'enum', enum: [ 'S', 'I', 'E', 'B', 'R', 'H', 'P' ], default: 'S' })
    public type: string;

    @Column({ name: 'width', width: 2, default: '1' })
    public width: number;

    @Column({ name: 'length', width: 2, default: '1' })
    public length: number;

    @Column({ name: 'stack_height', type: 'double', precision: 10, scale: 3, default: '0.000' })
    public stackHeight: number;

    @Column({ name: 'multi_heights', nullable: true })
    public multiHeights: string;

    @Column({ name: 'interaction', nullable: true })
    public interaction: string;

    @Column({ name: 'total_states', default: '0' })
    public totalStates: number;

    @Column({ name: 'can_stack', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public canStack: number;

    @Column({ name: 'can_walk', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public canWalk: number;

    @Column({ name: 'can_sit', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public canSit: number;

    @Column({ name: 'can_lay', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public canLay: number;

    @Column({ name: 'can_recycle', type: 'enum', enum: [ 0, 1 ], default: '0' })
    public canRecycle: number;

    @Column({ name: 'can_trade', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public canTrade: number;

    @Column({ name: 'can_inventory_stack', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public canInventoryStack: number;

    @Column({ name: 'can_sell', type: 'enum', enum: [ 0, 1 ], default: '1' })
    public canSell: number;

    @Column({ name: 'vending_ids', nullable: true })
    public vendingIds: string;

    @Column({ name: 'effect_ids', nullable: true })
    public effectIds: string;

    @Column({ name: 'extra_data', nullable: true })
    public extraData: string;

    @Column({ name: 'timestamp_created', default: () => 'CURRENT_TIMESTAMP' })
    public timestampCreated: Date;

    @OneToMany(type => FurnitureEntity, furniture => furniture.definition)
    public furniture: FurnitureEntity[];

    @OneToMany(type => CatalogItemEntity, catalogItems => catalogItems.definition)
    public catalogItems: CatalogItemEntity[];
}