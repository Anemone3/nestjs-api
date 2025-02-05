import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from '../domain/authResponse.interface';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(loginDto: LoginDto) {
    return await this.authRepository.login(loginDto.email, loginDto.password);
  }

  async register(registerDto: RegisterDto) {
    return await this.authRepository.register(registerDto);
  }

  async verifiyUser(otp: string, email: string): Promise<AuthResponse> {
    try {
      const user = await this.authRepository.verifyUser(otp, email);

      const payload = { sub: user.id, email: user.email };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });

      

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
        throw error
    }
  }
}
