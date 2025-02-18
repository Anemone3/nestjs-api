import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './domain/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './domain/authResponse.interface';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './infrastructure/dto';
import { JwtPayload } from './domain/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

      if (!user) throw new NotFoundException('No se encontro el usuario con los datos verificados, reintentar.');

      const payload: JwtPayload = { sub: user.id!, email: user.email };

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
      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.JWT_REFRESH_SECRET'),
      });
      
      if (!payload) throw new BadRequestException('invalid_grant');

      //Creamos un nuevo payload, ya que contiene objetos como el tiempo de expiración, y eso puede causar error al crear uno nuevo.

      const newPayload: JwtPayload = {
        sub: payload.sub,
        email: payload.email,
      };

      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        secret: this.configService.get<string>('jwt.JWT_ACCESS_SECRET'),
        expiresIn: '1d',
      });

      if (!newAccessToken) throw new InternalServerErrorException('Error to generate new access token');

      return newAccessToken;
    } catch (error) {
      console.log(error);

      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException({
          error: 'invalid_grant',
          error_description: 'The refresh token is invalid or expired.',
        });
      } else if (error.name === 'JsonWebTokenError') {
        throw new ForbiddenException({
          error: 'forbidden',
          error_description: 'El token es inválido o ha sido modificado.',
        });
      } else {
        throw new InternalServerErrorException({
          error: 'server_error',
          error_description: 'Error interno al refrescar el token.',
        });
      }
    }
  }
}
