import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoEntity } from '../entities/todo.entity';
import { ToDo } from '../dto/ToDo.dto';
import { toDoEntitiesToDtos, toDoEntityToDto } from './../mapper/todo.mapper';  // Import the array mapping function
import { CreateToDo } from '../dto/CreateToDo.dto';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private toDoRepository: Repository<ToDoEntity>,
  ) { }

  async getAllToDos(): Promise<Array<ToDo>> {
    var toDoEntities = await this.toDoRepository.find();
    var toDoDTO = toDoEntitiesToDtos(toDoEntities)
    return toDoDTO;
  }

  async getToDoById(toDoId: string): Promise<ToDo> {
    var toDoEntitie = await this.toDoRepository.findOne({ where: { id: toDoId } });
    var toDo = null;
    if (!toDoEntitie)
      throw new NotFoundException(`To Do Not Found`); 
    toDo = toDoEntityToDto(toDoEntitie)
    return toDo;
  }

  async addToDo(toDo: CreateToDo): Promise<ToDo> {
    var newToDO = this.toDoRepository.create({ name: toDo.name, description: toDo.description })
    var savedToDo = await this.toDoRepository.save(newToDO);

    return toDoEntityToDto(savedToDo);
  }

  deleteToDo(toDoId: string): void {
    var deletedToDo = this.toDoRepository.delete({ id: toDoId });
    deletedToDo.then(res=>console.log(res))
  }


}
