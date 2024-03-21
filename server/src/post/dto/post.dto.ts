import { IsDateString, IsString } from "class-validator"

export class PostDto {
    Id: number

    @IsString()
    title: string

    @IsString()
    description: string

    @IsDateString()
    created_at: Date

    @IsString()
    userId: string

    @IsString()
    author: string

    @IsString()
    categories: string
}
