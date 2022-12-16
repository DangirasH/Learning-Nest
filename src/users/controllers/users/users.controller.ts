import { CreateUserDto } from './../../dto/CreateUser.dto';
import { HttpExceptionFilter } from './../../filters/HttpException.filter';
import { UserNotFoundException } from './../../exceptions/UserNotFound.exception';
import { SerializedUser } from '../../types';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ParseIntPipe,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  // Uisng Interceptors with ClassSerializerInterceptor will hold certain data from unwanted eyes
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('§/username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  // Use Filters to be able to add exceptions to this function
  @UseFilters(HttpExceptionFilter)
  @Get('id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) {
      return new SerializedUser(user);
    } else {
      // Adding the exeception function to else if no user is found
      throw new UserNotFoundException('User was not found');
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
