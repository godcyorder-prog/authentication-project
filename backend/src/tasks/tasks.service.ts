import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  async create(userId: string, title: string) {
    const task = new this.taskModel({
      title,
      done: false,
      userId: new Types.ObjectId(userId),
    });

    return task.save();
  }

  async findAll(userId: string) {
    return this.taskModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async toggle(taskId: string, userId: string) {
    const task = await this.taskModel.findOne({
      _id: taskId,
      userId: new Types.ObjectId(userId),
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.done = !task.done;
    return task.save();
  }

  async remove(taskId: string, userId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId: new Types.ObjectId(userId),
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return { message: 'Task deleted successfully' };
  }
}