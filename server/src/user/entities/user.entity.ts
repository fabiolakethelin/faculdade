import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    Id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}
