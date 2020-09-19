import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity()
export class Champs {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    champName!: string

    @Column()
    champId!:string;

    @Column()
    fullImage!: string

    @Column()
    sprite!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}
