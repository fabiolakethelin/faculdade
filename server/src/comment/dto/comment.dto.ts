import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CommentDto {
    Id: number

    @IsString()
    description: string

    @IsNotEmpty()
    star_rating: number

    @IsDateString()
    created_at: Date

    @IsString()
    userId: string

    @IsString()
    author: string

    @IsNotEmpty()
    postId: number
}
