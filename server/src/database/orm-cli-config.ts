import 'dotenv/config'
import { Category } from 'src/category/entities/category.entity'
import { Comment } from 'src/comment/entities/comment.entity'
import { Email } from 'src/email/entities/email.entity'
import { CreateUserTable1708911580248 } from 'src/migrations/1708911580248-CreateUserTable'
import { CreatePostTable1708911728610 } from 'src/migrations/1708911728610-CreatePostTable'
import { CreateCategoryTable1708913171986 } from 'src/migrations/1708913171986-CreateCategoryTable'
import { CreateEmailTable1710639083618 } from 'src/migrations/1710639083618-CreateEmailTable'
import { CreateCommentTable1710812328600 } from 'src/migrations/1710812328600-CreateCommentTable'
import { Post } from 'src/post/entities/post.entity'
import { User } from 'src/user/entities/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Post, Category, Email, Comment]
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateUserTable1708911580248,
    CreatePostTable1708911728610,
    CreateCategoryTable1708913171986,
    CreateEmailTable1710639083618,
    CreateCommentTable1710812328600,
  ]
})
