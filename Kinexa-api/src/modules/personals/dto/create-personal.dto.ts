import { IsOptional, IsString } from "class-validator";

export class CreatePersonalDto {
    @IsOptional()
    @IsString()
    invite_slug?: string;
}