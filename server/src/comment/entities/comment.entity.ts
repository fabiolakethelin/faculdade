import { Post } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    description: string

    @Column()
    star_rating: number

    @Column()
    created_at: Date

    @Column()
    userId: string

    @Column()
    author: string

    @Column()
    postId: number

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}
