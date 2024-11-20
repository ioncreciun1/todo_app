import { Controller,Get, Param, Put,Delete, Body, UseGuards } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateToDo } from '../dto/CreateToDo.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('todo')
export class TodoController {
    constructor(private toDoService : TodoService){}

    @UseGuards(AuthGuard)
    @Get('/all')
    GetAll() {
        return this.toDoService.getAllToDos();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    GetToDoById(@Param('id') id: string) {
        return this.toDoService.getToDoById(id);
    }

    @UseGuards(AuthGuard)
    @Put('/add')
    AddToDo(@Body() createdToDo:CreateToDo) {
        return this.toDoService.addToDo(createdToDo);
    }

    @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    DeleteToDo(@Param('id') id: string) {
        return this.toDoService.deleteToDo(id);
    }

}
