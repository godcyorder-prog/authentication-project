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
import { GoalsService } from './goals.service';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(
    @Req() req: { user: { userId: string } },
    @Body('title') title: string,
  ) {
    return this.goalsService.create(req.user.userId, title);
  }

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.goalsService.findAll(req.user.userId);
  }

  @Patch(':id/toggle')
  toggle(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.goalsService.toggle(id, req.user.userId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.goalsService.remove(id, req.user.userId);
  }
}