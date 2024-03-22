import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, Inject } from '@nestjs/common'
import { PostService } from './post.service'
import { PostDto } from './dto/post.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('api/post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  @Inject()
    private readonly postService: PostService

  @Post()
  async create(@Body() postDto: PostDto) {
    return await this.postService.create(postDto)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() postDto: PostDto) {
    return await this.postService.update(id, postDto)
  }

  @Get()
  async findAll(@Query() category?: string) {
    return await this.postService.findAll(category)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postService.findOne(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postService.remove(id)
  }
}
