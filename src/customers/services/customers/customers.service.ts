import { createCustomerDto } from './../../dtos/CreateCustomer.dto';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/types/Customers';
@Injectable()
export class CustomersService {
  // List of customers that come from your code
  private customers: Customer[] = [
    {
      id: 1,
      email: 'danny@gmail.com',
      name: 'Danny Danny',
    },
    {
      id: 2,
      email: 'adam@gmail.com',
      name: 'Adam Adam',
    },
    {
      id: 3,
      email: 'spencer@gmail.com',
      name: 'Spencer Spencer',
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }
  // Code for Post Getting Customers
  createCustomer(customerDto: createCustomerDto) {
    this.customers.push(customerDto);
  }
  // Get all customers
  getCustomers() {
    return this.customers;
  }
}
