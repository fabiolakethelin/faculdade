import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { CommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(commentDto: CommentDto): Promise<Comment> {
    try {
      return await this.commentRepository.save(commentDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async update(id: number, commentDto: CommentDto): Promise<void> {
    try {
      const comment = await this.commentRepository.findOne({where: {Id: id}})

      if (!comment) {
        throw new NotFoundException()
      }

      await this.commentRepository.update({Id: comment.Id}, commentDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findAll(): Promise<Comment[]> {
    try {
      let comment = await this.commentRepository.find()

      return comment
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findOne(id: number): Promise<Comment> {
    try {
      return await this.commentRepository.findOne({where: {Id: id}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    try {
      return await this.commentRepository.find({where: {postId: postId}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
  
  async remove(id: number): Promise<Comment> {
    try {
      const post = await this.commentRepository.findOne({where: {Id: id}})

      if (!post) {
        throw new NotFoundException()
      }

      return await this.commentRepository.remove(post)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
}
