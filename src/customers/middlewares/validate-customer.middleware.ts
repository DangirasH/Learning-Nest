import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
// 2nd Middleware Checking if account is valid
@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('ValidateCustomerMiddleware');
    // Adding an authorization token to the request that the Validate middleware is going through
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).send({ error: 'No Authorization Token Provided' });
    // Adding a condition that the authorization token must be === 123
    if (authorization === '123') {
      next();
    } else {
      return res
        .status(403)
        .send({ error: 'Invalid Authorization Token Provided' });
    }
  }
}
