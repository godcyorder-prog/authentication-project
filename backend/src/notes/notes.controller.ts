
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type AuthenticatedRequest = {
  user: {
    userId: string;
  };
};

type NoteInput = {
  title: string;
  content?: string;
  color?: string;
};

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() body: NoteInput,
  ) {
    if (!body.title?.trim()) {
      throw new BadRequestException('Note title is required');
    }

    return this.notesService.create(req.user.userId, body);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.notesService.findAll(req.user.userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() body: Partial<NoteInput>,
  ) {
    return this.notesService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.notesService.remove(id, req.user.userId);
  }
}
