import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './Users'

@Entity()
export class Summoner {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    summoner!: string

    @Column()
    profileicon!: string

    @Column()
    region!: string

    @ManyToOne(type => Users, users => users.summoner)
    users!: Users
}
