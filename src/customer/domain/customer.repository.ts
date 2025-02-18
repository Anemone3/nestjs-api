import { JpaRepository } from 'src/utils/JpaRepository';
import { Customer } from './customer.entities';
import { CreateCustomerDto, UpdateCustomerDto } from '../infrastructure/dto';

export interface CustomerRepository extends JpaRepository<Customer, string, CreateCustomerDto, UpdateCustomerDto> {

}
