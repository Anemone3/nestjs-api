import { User } from 'src/user/domain/user.entity';
import { RegisterDto } from '../application/dto';

//todo: make response
export interface AuthRepository {
  login(email: string, password: string): Promise<string>;
  register(registerDto: RegisterDto): Promise<string>;
  verifyUser(otp: string, email: string): Promise<User>;
  refreshToken(token: string): Promise<string>;
  logout(token: string): Promise<string>;
}
