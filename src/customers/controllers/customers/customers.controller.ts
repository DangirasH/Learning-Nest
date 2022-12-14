import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
  Res,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { createCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
// Make Sure to import all @s
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  // First Way of Getting a Customer
  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send({ msg: 'Customer not found' });
    }
  }
  // Getting an id much easier using Nest from Services
  @Get('/search/:id')
  searchCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  }
  // Easy way of getting all Customers
  @Get('')
  getAllCustomers() {
    return this.customersService.getCustomers();
  }
  // Easy Adding Way to add a Customer
  // For Vaidation you must add @usePipes and validationPipe to the Post
  @Post('create')
  @UsePipes(ValidationPipe)
  createcustomer(@Body() createCustomerDto: createCustomerDto) {
    console.log(createCustomerDto);
    this.customersService.createCustomer(createCustomerDto);
  }
}
