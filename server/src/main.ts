import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  app.use(cookieParser())

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
  }
  app.enableCors(corsOptions)

  await app.listen(3001)
}
bootstrap()
