import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('api/category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
    return this.categoryService.update(id, categoryDto)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id)
  }
}
