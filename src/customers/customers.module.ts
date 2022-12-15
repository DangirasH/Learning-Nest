import { NextFunction } from 'express';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account-middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
// We Added a middleware for all CustomerController functions get/post etc...
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Adding a second middleware for the apply and so where ever it is not excluded 2 middlewares will go through
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last Middleware');
          next();
        },
      )
      // We can exclude middleware from certain functions when using the entire Controller
      .exclude(
        {
          path: 'api/customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'api/customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}
