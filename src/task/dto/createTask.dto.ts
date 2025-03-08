import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus, {
    message: 'Task status must be TODO, IN_PROGRESS or DONE',
  })
  status: TaskStatus;
}
