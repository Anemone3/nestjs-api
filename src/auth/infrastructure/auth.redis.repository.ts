import { AuthRepository } from '../domain/auth.repository';
import { EmailService, MailErrorHandler } from 'src/email/email.service';
import { OtpService } from 'src/otp/otp.service';
import { CreateUserDto } from 'src/user/domain/dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RedisAuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendEmail: EmailService,
    private readonly otpService: OtpService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new Error('User not found');

    const otp = await this.otpService.saveOtp(email);

    if (!otp) throw new Error('Otp not found');

    await this.sendEmail.sendEmail(email, 'Verify otp', 'User verification', `<h1>Your otp code is:  ${otp}</h1>`);

    return otp;
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const { email, firstname, lastname, password } = createUserDto;
    console.log('Creating user:', createUserDto);
    try {
      const userRegister: User = await this.prismaService.user.create({
        data: {
          email,
          firstname,
          lastname,
          password,
          role: 'USER',
        },
      });

      console.log('User registered:', userRegister);

      if (!userRegister) {
        throw new InternalServerErrorException('User not created');
      }

      const otp = await this.otpService.saveOtp(userRegister.email);
      if (!otp) throw new InternalServerErrorException('Otp not created');
      await this.sendEmail.sendEmail(
        userRegister.email,
        'Verify otp',
        'User verification',
        `<h1>Your otp code is:  ${otp}</h1>`,
      );

      return otp;
    } catch (error) {
      console.error('Error creating user:', error);
      if(error instanceof MailErrorHandler){
        throw new BadRequestException(error.message)
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  validateToken(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  refreshToken(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  logout(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
