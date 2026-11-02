

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module';
import { GoalsModule } from './goals/goals.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/authentication_db'),
    UsersModule,
    AuthModule,
    NotesModule,
    TasksModule,
    GoalsModule,
  ],
})
export class AppModule {}
