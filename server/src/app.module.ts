import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { CategoryModule } from './category/category.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { EmailModule } from './email/email.module'
import { CommentModule } from './comment/comment.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PostModule,
    CategoryModule,
    DatabaseModule,
    EmailModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
