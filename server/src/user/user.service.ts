import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { LoginDto, LoginReturnDto, UserDto } from './dto/user.dto'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { Response } from 'express'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly authService: AuthService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    try {

      const user = await this.userRepository.findOne({where: {email: userDto.email}})

      if (user) {
        throw new Error('Esse email já existe!')
      }

      userDto.password = await bcrypt.hash(userDto.password, 10)

      return await this.userRepository.save(userDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({where: {Id: id}})

      if (!user) {
        throw new NotFoundException()
      }

      const userByEmail = await this.userRepository.findOne({where: {email: userDto.email}})

      if (userByEmail) {
        throw new BadRequestException('Esse email já existe!')
      }

      const checkPassword = await bcrypt.compare(user.password, userDto.password)
  
      if (!checkPassword) {
        user.password = await bcrypt.hash(userDto.password, 10)
      }
  
      userDto.password = user.password

      return await this.userRepository.save(userDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({where: {Id: id}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async login(loginDto: LoginDto, response: Response): Promise<LoginReturnDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email
        }
      })

      if (!user) {
        throw new Error("Email inválido!")
      }

      const checkPassword = await bcrypt.compare(loginDto.password, user.password)

      if (!checkPassword) {
        throw new Error("Senha inválida!")
      }

      const jwtToken = await this.authService.createToken(user.Id)

      const res: LoginReturnDto = {
        name: user.name,
        jwtToken: jwtToken,
        email: user.email,
      }
  
      response.cookie('token', jwtToken)
      response.cookie('user', user.name)

      return res
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async logout(response: Response) {
    try {
  
      response.clearCookie('token')
      response.clearCookie('user')

      return { message: 'Logout realizado com sucesso!' }
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
  
  async remove(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({where: {Id: id}})

      if (!user) {
        throw new NotFoundException()
      }

      return await this.userRepository.remove(user)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
}
