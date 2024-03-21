import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('email')
export class Email {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    message: string
}
