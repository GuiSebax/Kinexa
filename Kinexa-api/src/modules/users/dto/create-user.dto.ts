import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export enum UserRole {
    STUDENT = 'STUDENT',
    PERSONAL = 'PERSONAL',
    ADMIN = 'ADMIN',
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}