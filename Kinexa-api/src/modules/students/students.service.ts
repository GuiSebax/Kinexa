import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LinkPersonalDto } from './dto/link-personal.dto';

@Injectable()
export class StudentsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, dto: CreateStudentDto) {
        const existingStudent = await this.prisma.student.findUnique({
            where: { user_id: userId },
        });

        if (existingStudent) {
            throw new BadRequestException('Student já existe para este usuário.');
        }

        return this.prisma.student.create({
            data: {
                user_id: userId,
                ...dto,
                current_streak: 0,
                total_xp: 0,
            },
        });
    }

    async me(userId: string) {
        return this.prisma.student.findUnique({
            where: { user_id: userId },
        });
    }

    async linkPersonal(userId: string, dto: LinkPersonalDto) {
        const student = await this.prisma.student.findUnique({
            where: { user_id: userId },
        });

        if (!student) {
            throw new BadRequestException('Student não encontrado.');
        }

        const personal = await this.prisma.personal.findUnique({
            where: { invite_slug: dto.invite_slug },
        });

        if (!personal) {
            throw new BadRequestException('Invite inválido.');
        }

        return this.prisma.studentPersonal.create({
            data: {
                student_id: student.id,
                personal_id: personal.id
            }
        })
    }
}
