import { IsEmail, IsString } from "class-validator"

export class EmailDto {
    Id: number

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    message: string
}
