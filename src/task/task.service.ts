import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { createApiResponse } from 'src/utils/createApiRes';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(page, limit) {
    const take = limit;
    const skip = (page - 1) * limit;
    const tasks = await this.taskRepository.find({ skip, take });

    const tasksCount = await this.taskRepository.count();
    return createApiResponse({
      status: 'success',
      message: 'Fetched Tasks Successfully.',
      data: tasks,
      metadata: {
        totalItems: tasksCount,
        totalPages: Math.ceil(tasksCount / limit),
        pageSize: limit,
        currentPage: page,
      },
    });
  }

  async createTask(dto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create({
        ...dto,
      });

      const savedTask = await this.taskRepository.save(task);
      return createApiResponse({
        status: 'success',
        message: 'Successfully created Task',
        data: savedTask,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
