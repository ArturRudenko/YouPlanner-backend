import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { PomodoroRoundDto } from './dto/round.dto'

@Controller('user/pomodoro')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') id: string) {
		return this.pomodoroService.getTodaySession(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
		return this.pomodoroService.updateRound(dto, id)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Param('id') id: string,
		@CurrentUser('id') userId: string,
		@Body() dto: PomodoroRoundDto
	) {
		return this.pomodoroService.updateSession(dto, id, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.pomodoroService.deleteSession(id, userId)
	}
}
