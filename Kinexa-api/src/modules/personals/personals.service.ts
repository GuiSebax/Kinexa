import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PersonalsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: string, dto: CreatePersonalDto) {
        const existingPersonal = await this.prisma.personal.findUnique({
            where: { user_id: userId },
        });

        if (existingPersonal) {
            throw new BadRequestException(
                'Personal já existe para este usuário.',
            );
        }

        const inviteSlug = dto.invite_slug ?? randomUUID().slice(0, 8);

        return this.prisma.personal.create({
            data: {
                user_id: userId,
                invite_slug: inviteSlug,
            },
        });
    }

    async me(userId: string) {
        return this.prisma.personal.findUnique({
            where: { user_id: userId }
        });
    }
}
