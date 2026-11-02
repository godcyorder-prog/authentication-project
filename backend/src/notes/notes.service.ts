
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from './note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
  ) {}

  async create(userId: string, data: {
    title: string;
    content?: string;
    color?: string;
  }) {
    const note = new this.noteModel({
      ...data,
      userId: new Types.ObjectId(userId),
    });

    return note.save();
  }

  async findAll(userId: string) {
    return this.noteModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async update(
    noteId: string,
    userId: string,
    data: { title?: string; content?: string; color?: string },
  ) {
    const note = await this.noteModel.findOneAndUpdate(
      {
        _id: noteId,
        userId: new Types.ObjectId(userId),
      },
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async remove(noteId: string, userId: string) {
    const note = await this.noteModel.findOneAndDelete({
      _id: noteId,
      userId: new Types.ObjectId(userId),
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return { message: 'Note deleted successfully' };
  }
}
