import { IsEmail, IsString } from "class-validator";

export class UserDto {
    Id?: string;

    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class LoginDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export interface LoginReturnDto {
    name: string;
    jwtToken: string;
    email: string;
}