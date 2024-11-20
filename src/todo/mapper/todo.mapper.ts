import { ToDo } from "../dto/ToDo.dto";
import { ToDoEntity } from "../entities/todo.entity";

// Converts a single ToDo entity to a DTO
export function toDoEntityToDto(todo: ToDoEntity): ToDo {
  const dto = new ToDo();
  dto.id = todo.id;
  dto.name = todo.name;
  dto.description = todo.description;
  dto.isCompleted = todo.isCompleted;
  return dto;
}

// Converts an array of ToDo entities to an array of DTOs
export function toDoEntitiesToDtos(todos: ToDo[]): ToDo[] {
  return todos.map(toDoEntityToDto);  // Map each entity to a DTO
}