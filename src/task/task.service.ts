import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto';
import { createApiResponse } from 'src/utils/createApiRes';
import { UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  // method to get tasks allows for pagination
  async getTasks(userId: string, page: number, limit: number) {
    const take = limit;
    const skip = (page - 1) * limit;
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId } },
      skip,
      take,
    });

    const tasksCount = await this.taskRepository.count({
      where: { user: { id: userId } },
    });
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
  // method to create a task
  async createTask(userId: string, dto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create({
        ...dto,
        user: { id: userId },
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

  // method to update task thattakes in the id of the task and a partial task object
  async updateTask(userId: string, id: string, dto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!task) {
        throw new NotFoundException(`Task not found`);
      }

      await this.taskRepository.update(id, dto);
      const updatedTask = await this.taskRepository.findOne({ where: { id } });

      return createApiResponse({
        status: 'success',
        message: 'Task updated successfully',
        data: updatedTask,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  // method to delete a task: performs soft delete by setting isDeleted to true
  async deleteTask(userId: string, id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!task) {
        throw new NotFoundException(`Task not found`);
      }

      await this.taskRepository.update(id, { isDeleted: true });

      return createApiResponse({
        status: 'success',
        message: 'Task deleted successfully',
        data: null,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}
