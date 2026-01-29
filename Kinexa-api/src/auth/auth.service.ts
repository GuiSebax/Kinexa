import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException("Usuário não existente e/ou Credenciais Inválidas.");
        }

        const passwordValid = await bcrypt.compare(
            password, user.password_hash
        );

        if (!passwordValid) {
            throw new UnauthorizedException("Senha Inválida.");
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }

    async login(user: { id: string; email: string; role: string }) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}
