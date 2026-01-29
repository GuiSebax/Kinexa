import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PersonalsService } from './personals.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreatePersonalDto } from './dto/create-personal.dto';

@Controller('personals')
@UseGuards(JwtAuthGuard)
export class PersonalsController {
    constructor(private readonly personalsService: PersonalsService) { }

    @Post()
    create(
        @CurrentUser() user: { id: string },
        @Body() dto: CreatePersonalDto,
    ) {
        return this.personalsService.create(user.id, dto);
    }

    @Get('me')
    me(@CurrentUser() user: { id: string }) {
        return this.personalsService.me(user.id)
    }
}
