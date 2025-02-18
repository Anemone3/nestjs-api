import { JpaRepository } from 'src/utils/JpaRepository';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from '../infrastructure/dto';

export interface UserRepository extends JpaRepository<User, string, CreateUserDto, UpdateUserDto> {
  findUserByEmail(email: string): Promise<User>;
}
