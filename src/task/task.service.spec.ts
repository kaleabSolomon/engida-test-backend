import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskStatus } from 'src/common/enums/task';

// Mock data for user and task
const mockUser = {
  id: 'user-id',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'hashed-password',
  createdAt: new Date(),
  tasks: [], // Initially empty tasks list
};

const mockTasks = [
  {
    id: 'task-1',
    title: 'Task 1',
    status: TaskStatus.todo, // TaskStatus.todo
    isDeleted: false,
    createdAt: new Date(),
    userId: 'user-id',
    user: mockUser, // Associate with the mock user
  },
  {
    id: 'task-2',
    title: 'Task 2',
    status: TaskStatus.done, // TaskStatus.done
    isDeleted: false,
    createdAt: new Date(),
    userId: 'user-id',
    user: mockUser, // Associate with the mock user
  },
];

// Mock repository for Task
const mockTaskRepository = {
  find: jest.fn(),
  count: jest.fn(),
};

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<jest.Mocked<Repository<Task>>>(
      getRepositoryToken(Task),
    );
  });

  it('should return tasks for a given user', async () => {
    const userId = 'user-id';
    const page = 1;
    const limit = 10;

    // Mock the behavior of repository methods
    taskRepository.find.mockResolvedValue(mockTasks); // Mock the returned tasks
    taskRepository.count.mockResolvedValue(mockTasks.length); // Mock the count of tasks

    // Call the service method
    const result = await taskService.getTasks(userId, page, limit);

    // Log the result to check its structure
    console.log(result);

    // Assertions
    expect(result.status).toBe('success');
    expect(result.data).toHaveLength(2); // We mocked 2 tasks
    expect(result.metadata.totalItems).toBe(2); // 2 tasks
    expect(result.metadata.totalPages).toBe(1); // 2 tasks, 1 page
    expect(result.metadata.currentPage).toBe(1);
    expect(result.metadata.pageSize).toBe(10);
  });
});
