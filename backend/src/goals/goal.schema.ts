import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GoalDocument = HydratedDocument<Goal>;

@Schema({ timestamps: true })
export class Goal {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
