import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('')
  async getTasks(@Query('page') page: number, @Query('limit') limit: number) {
    page = Math.max(1, Number(page) || 1);
    limit = Math.max(1, Number(limit) || 10);

    return this.taskService.getTasks(page, limit);
  }

  @Post('')
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(id, dto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
