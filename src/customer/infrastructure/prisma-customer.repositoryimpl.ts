import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from '../domain/customer.entities';
import { CustomerRepository } from '../domain/customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { Customer as CustomerPrisma } from '@prisma/client';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

export class CustomerPrismaRepositoryImpl implements CustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(createDto: CreateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.prismaService.customer.create({
        data: {
          address: createDto.address,
          departamento: createDto.departamento,
          phone: createDto.phone,
        },
      });
      if (!customer) throw new InternalServerErrorException('Error to create a customer');

      return this.mappedToEntity(customer);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id: string, updateDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const updatedCustomer = await this.prismaService.customer.update({
        where: { userId: id },
        data: updateDto,
      });

      return this.mappedToEntity(updatedCustomer);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('No se pudo actualizar el customer.');
    }
  }

  async remove(id: string): Promise<void | Customer> {
    try {
      const customerDelete = await this.prismaService.customer.delete({ where: { userId: id } });

      return this.mappedToEntity(customerDelete);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('No se pudo actualizar el customer.');
    }
  }
  async findById(id: string): Promise<Customer> {
    try {
      const customer = await this.prismaService.customer.findUniqueOrThrow({ where: { userId: id } });

      return this.mappedToEntity(customer);
    } catch (error) {
      console.log(error);
      if ((error.code = 'P2025')) throw new NotFoundException(`no existe un usuario con el id ${id}`);
      throw new InternalServerErrorException('No se pudo actualizar el customer.');
    }
  }
  async findAll(): Promise<Customer[]> {
    try {
      const customers = await this.prismaService.customer.findMany();

      return customers.map(c => this.mappedToEntity(c));
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('error to find all customer');
    }
  }

  private mappedToEntity(prisma: CustomerPrisma): Customer {
    return {
      id: prisma.id,
      address: prisma.address,
      departamento: prisma.departamento,
      phone: prisma.phone,
      userId: prisma.userId,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
    };
  }
}
