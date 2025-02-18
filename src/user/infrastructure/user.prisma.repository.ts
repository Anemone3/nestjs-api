import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User as UserPrisma, Role as PrismaRole } from '@prisma/client';
import { Role } from '../domain/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserPrismaRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userPrisma = await this.prismaService.user.create({
        data: createUserDto,
      });

      return this.mappedToEntity(userPrisma);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(user => this.mappedToEntity(user));
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new NotFoundException(`User not found with email ${email}`);

    return this.mappedToEntity(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new NotFoundException(`User not found with id ${id}`);

    return this.mappedToEntity(user);
  }

  async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    const userUpdated = await this.prismaService.user.update({
      where: { id: id },
      data: updatedUserDto,
    });

    return this.mappedToEntity(userUpdated);
  }

  async remove(id: string): Promise<User> {
    await this.findById(id);

    const useRemoved = await this.prismaService.user.delete({
      where: { id: id },
    });
    return this.mappedToEntity(useRemoved);
  }

  private mappedToEntity(user: UserPrisma): User {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      profile: user.profile,
      role: user.role as Role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
