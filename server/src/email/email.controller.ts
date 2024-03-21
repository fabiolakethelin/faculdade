import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { EmailService } from './email.service'
import { EmailDto } from './dto/email.dto'

@Controller('api/email')
@UseGuards(AuthGuard('jwt'))
export class EmailController {
  constructor(
    private readonly emailService: EmailService
  ) {}

  @Post()
  create(@Body() emailDto: EmailDto) {
    return this.emailService.create(emailDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() emailDto: EmailDto) {
    return this.emailService.update(id, emailDto)
  }

  @Get()
  findAll() {
    return this.emailService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.emailService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.emailService.remove(id)
  }
}
