import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './utils/LocalStrategy';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStategy,
  ],
})
export class AuthModule {}
