import { IsString } from "class-validator";

export class LinkPersonalDto {
    @IsString()
    invite_slug: string;
}