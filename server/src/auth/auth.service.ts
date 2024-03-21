import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtPayload, sign } from 'jsonwebtoken'
import { Repository } from 'typeorm'
import 'dotenv/config'
import { Request } from 'express'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createToken(Id: string): Promise<string> {
    return sign({ Id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    })
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Id: jwtPayload.Id },
    })

    if (user == null) {
      throw new UnauthorizedException()
    }

    return user
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization

    if (authHeader == null) {
      throw new UnauthorizedException()
    }

    const [, token] = authHeader.split(' ')

    return token
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor
  }
}
