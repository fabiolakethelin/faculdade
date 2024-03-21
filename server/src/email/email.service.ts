import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Email } from './entities/email.entity'
import { EmailDto } from './dto/email.dto'

@Injectable()
export class EmailService {
  constructor (
    @InjectRepository(Email)
    private readonly categoryRepository: Repository<Email>
  ) {}

  async create(emailDto: EmailDto): Promise<Email> {
    try {
      return await this.categoryRepository.save(emailDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async update(id: number, emailDto: EmailDto): Promise<Email> {
    try {
      const email = await this.categoryRepository.findOne({where: {Id: id}})

      if (!email) {
        throw new NotFoundException()
      }

      return await this.categoryRepository.save(emailDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findAll(): Promise<Email[]> {
    try {
      return await this.categoryRepository.find()
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findOne(id: number): Promise<Email> {
    try {
      return await this.categoryRepository.findOne({where: {Id: id}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
  
  async remove(id: number): Promise<Email> {
    try {
      const email = await this.categoryRepository.findOne({where: {Id: id}})

      if (!email) {
        throw new NotFoundException()
      }

      return await this.categoryRepository.remove(email)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
}
