import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Comment } from './entities/comment.entity'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
