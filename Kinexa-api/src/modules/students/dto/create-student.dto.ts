import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateStudentDto {
    @IsBoolean()
    allow_ai_swap: boolean;

    @IsString()
    gender: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    body_fat_pcl: number;

    @IsNumber()
    muscle_mass_pcl: number;

    @IsInt()
    body_visual_ref_id: number;

    @IsString()
    sleep_quality: string;

    @IsString()
    activity_level: string;

    @IsString()
    training_experience: string;

    @IsInt()
    months_trained_total: number;

    @IsInt()
    months_inactive: number;

    @IsOptional()
    @IsString()
    injuries_and_pains?: string;

    @IsOptional()
    @IsString()
    pathologies?: string;

    @IsOptional()
    @IsString()
    exercise_preferences?: string;
}