import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Post('')
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
