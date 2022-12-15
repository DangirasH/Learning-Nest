import { HttpException, HttpStatus } from '@nestjs/common';
// Creation of an exeception adding a message to a function sending it to user controller get id id
export class UserNotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'User not found', status || HttpStatus.BAD_REQUEST);
  }
}
