import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../../types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'anson',
      password: 'anson',
    },
    {
      id: 2,
      username: 'danny',
      password: 'danny',
    },
    {
      id: 3,
      username: 'derek',
      password: 'derek',
    },
    {
      id: 4,
      username: 'samantha',
      password: 'samantha',
    },
  ];
  // adding a Serialzed User is a way to protect vision of this specific data
  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
