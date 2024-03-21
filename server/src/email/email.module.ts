import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'
import { Email } from './entities/email.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Email]), AuthModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
