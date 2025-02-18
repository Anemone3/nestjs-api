import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './infrastructure/dto';
import { UserRepository } from './domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }

  async findAllUsers() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findById(id);
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    return await this.userRepository.update(id, updateUser);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }
}
