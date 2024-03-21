import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    created_at: Date

    @Column()
    userId: string

    @Column()
    author: string

    @Column()
    categories: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}
