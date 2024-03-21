import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, Inject } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'

@Controller('api/comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  @Inject()
    private readonly commentService: CommentService

  @Post()
  async create(@Body() commentDto: CommentDto) {
    return await this.commentService.create(commentDto)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() commentDto: CommentDto) {
    return await this.commentService.update(id, commentDto)
  }

  @Get()
  async findAll() {
    return await this.commentService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.commentService.findOne(id)
  }

  @Get('/getByPostId/:postId')
  async findByPostId(@Param('postId') postId: number) {
    return await this.commentService.findByPostId(postId)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.commentService.remove(id)
  }
}
