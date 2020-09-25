import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity()
export class Rank {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    filename!: string

    @Column()
    searchname!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}
