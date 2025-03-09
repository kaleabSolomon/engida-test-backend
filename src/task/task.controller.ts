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
import { GetCurrentUser } from 'src/common/decorators';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('')
  async getTasks(
    @GetCurrentUser('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = Math.max(1, Number(page) || 1);
    limit = Math.max(1, Number(limit) || 10);

    return this.taskService.getTasks(userId, page, limit);
  }

  @Post('')
  async createTask(
    @GetCurrentUser('userId') userId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.createTask(userId, dto);
  }

  @Patch(':id')
  async updateTask(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, id, dto);
  }

  @Delete(':id')
  async deleteTask(
    @GetCurrentUser('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.taskService.deleteTask(userId, id);
  }
}
