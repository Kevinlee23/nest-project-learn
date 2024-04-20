import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
      roles: ['admin'],
    },
    {
      userId: '2',
      username: 'maria',
      password: 'guess',
      roles: ['user'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  create(user: CreateUserDto) {
    return {
      message: 'create new user',
      data: user,
    };
  }
}
