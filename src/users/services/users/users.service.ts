import { User as UserEntity } from '../../../typeorm';
import { CreateUserDto } from './../../dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../../types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
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

  createUser(CreateUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(CreateUserDto);
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
