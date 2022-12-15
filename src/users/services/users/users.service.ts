import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../../types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'anson',
      password: 'anson',
    },
    {
      username: 'danny',
      password: 'danny',
    },
    {
      username: 'derek',
      password: 'derek',
    },
    {
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
}
