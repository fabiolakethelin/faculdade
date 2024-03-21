import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { CategoryDto } from './dto/category.dto'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CategoryService {
  constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(categoryDto: CategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.save(categoryDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({where: {Id: id}})

      if (!category) {
        throw new NotFoundException()
      }

      return await this.categoryRepository.save(categoryDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find()
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOne({where: {Id: id}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
  
  async remove(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({where: {Id: id}})

      if (!category) {
        throw new NotFoundException()
      }

      return await this.categoryRepository.remove(category)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
}
