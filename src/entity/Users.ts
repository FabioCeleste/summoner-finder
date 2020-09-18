import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany } from 'typeorm'
import { Summoner } from './Summoner'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column({
      unique: true
    })
    email!:string;

    @Column()
    password!:string;

    @OneToMany(type => Summoner, summoner => summoner.users)
    summoner!: string

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
