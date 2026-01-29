import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LinkPersonalDto } from './dto/link-personal.dto';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {

    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    create(
        @CurrentUser() user: { id: string },
        @Body() dto: CreateStudentDto,
    ) {
        return this.studentsService.create(user.id, dto);
    }

    @Get('me')
    me(@CurrentUser() user: { id: string }) {
        return this.studentsService.me(user.id)
    }

    @Post('link-personal')
    linkPersonal(
        @CurrentUser() user: { id: string },
        @Body() dto: LinkPersonalDto,
    ) {
        return this.studentsService.linkPersonal(
            user.id,
            dto
        )
    }
}
