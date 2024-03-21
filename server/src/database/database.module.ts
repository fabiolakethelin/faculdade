import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/category/entities/category.entity'
import { Comment } from 'src/comment/entities/comment.entity'
import { Email } from 'src/email/entities/email.entity'
import { Post } from 'src/post/entities/post.entity'
import { User } from 'src/user/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [User, Post, Category, Email, Comment],
        }
      },
      inject: [ConfigService],
    })
  ]
})
export class DatabaseModule {}
