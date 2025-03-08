import { User } from 'src/auth/entities/user.entity';
import { TaskStatus } from 'src/common/enums/task';
import { Column, ManyToOne } from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.todo,
  })
  status: TaskStatus;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // Many Tasks belong to one User (Many-to-One Relationship)
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
