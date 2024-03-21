import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Post } from './entities/post.entity'
import { PostDto } from './dto/post.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PostService {
  constructor (
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create(postDto: PostDto): Promise<Post> {
    try {
      return await this.postRepository.save(postDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async update(id: number, postDto: PostDto): Promise<void> {
    try {
      const post = await this.postRepository.findOne({where: {Id: id}})

      if (!post) {
        throw new NotFoundException()
      }

      await this.postRepository.update({Id: post.Id}, postDto)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findAll(category?: string): Promise<Post[]> {
    try {
      let posts =  await this.postRepository.find()

      if (category.length > 0) {
        posts = posts.filter(x => x.categories.includes(category))
      }

      return posts
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.postRepository.findOne({where: {Id: id}})
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
  
  async remove(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({where: {Id: id}})

      if (!post) {
        throw new NotFoundException()
      }

      return await this.postRepository.remove(post)
    }
    catch (error) {
      throw new HttpException(error.message, error.status ?? 400)
    }
  }
}
