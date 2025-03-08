import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be either todo, done or inprogress',
  })
  status?: TaskStatus;
}
