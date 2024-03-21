import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res, UseGuards, } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginDto, UserDto } from './dto/user.dto'
import { Response, Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto)
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.userService.login(loginDto, response)
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Res({ passthrough: true }) response, @Req() req: Request) {
    return this.userService.logout(response)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
