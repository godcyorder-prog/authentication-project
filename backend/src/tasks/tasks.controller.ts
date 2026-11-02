import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Req() req: { user: { userId: string } },
    @Body('title') title: string,
  ) {
    return this.tasksService.create(req.user.userId, title);
  }

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Patch(':id/toggle')
  toggle(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.tasksService.toggle(id, req.user.userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.tasksService.remove(id, req.user.userId);
  }
}