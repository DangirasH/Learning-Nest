import entities from './typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    // Implemented TypeOrm configuration forRoot
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Birdisasinger2!',
      database: 'tutorial_db',
      entities: entities,
      synchronize: true, // False in production mode  to not lose data
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
