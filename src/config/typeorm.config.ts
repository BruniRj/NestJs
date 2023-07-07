import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/auth.entity';
import { Task } from 'src/tasks/entity/task.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  host: 'localhost',
  type: 'postgres',
  port: 5432,
  username: 'anonymous',
  password: 'root',
  database: 'taskmanagement',
  // entities: [__dirname + '/../**/*.entity.ts'],
  entities: [Task, User],
  synchronize: true,
};
