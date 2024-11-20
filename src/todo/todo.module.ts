import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { ToDoEntity } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ToDoEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
