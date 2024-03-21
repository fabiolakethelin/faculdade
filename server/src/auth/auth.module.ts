import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import 'dotenv/config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { User } from 'src/user/entities/user.entity'
import { Category } from 'src/category/entities/category.entity'
import { Post } from 'src/post/entities/post.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Category]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
