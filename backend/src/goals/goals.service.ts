import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Goal, GoalDocument } from './goal.schema';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>,
  ) {}

  async create(userId: string, title: string) {
    const goal = new this.goalModel({
      title,
      done: false,
      userId: new Types.ObjectId(userId),
    });

    return goal.save();
  }

  async findAll(userId: string) {
    return this.goalModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async toggle(goalId: string, userId: string) {
    const goal = await this.goalModel.findOne({
      _id: goalId,
      userId: new Types.ObjectId(userId),
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.done = !goal.done;
    return goal.save();
  }

  async remove(goalId: string, userId: string) {
    const goal = await this.goalModel.findOneAndDelete({
      _id: goalId,
      userId: new Types.ObjectId(userId),
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    return { message: 'Goal deleted successfully' };
  }
}