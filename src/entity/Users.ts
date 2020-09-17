import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!:string;

    @Column()
    password!:string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
