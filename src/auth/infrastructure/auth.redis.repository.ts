import { AuthRepository } from '../domain/auth.repository';
import { EmailService, MailErrorHandler } from 'src/email/email.service';
import { OtpService } from 'src/otp/otp.service';
import { CreateUserDto } from 'src/user/domain/dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/domain/user.entity';
import { BcryptAdaptar } from 'src/utils/BcryptAdapter';

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
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = BcryptAdaptar.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Wrong password');

    const otp = await this.otpService.saveOtp(email);

    if (!otp) throw new Error('Otp not found');

    await this.sendEmail.sendEmail(email, 'Verify otp', 'User verification', `<h1>Your otp code is:  ${otp}</h1>`);

    return otp;
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const { email, firstname, lastname, password } = createUserDto;
    try {
      const passwordHashed = BcryptAdaptar.hash(password);

      const userRegister = await this.prismaService.user.create({
        data: {
          email,
          firstname,
          lastname,
          password: passwordHashed,
          role: 'USER',
        },
      });

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
      if (error instanceof MailErrorHandler) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async verifyUser(otp: string, email: string): Promise<User> {
    try {
      const isVerificated: boolean = await this.otpService.verifyOtp(email, otp);
      if (!isVerificated) throw new BadRequestException('Wrong otp code, retry again');

      const user = await this.prismaService.user.findUnique({ where: { email } });

      if (!user) throw new InternalServerErrorException('User not found');

      return {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        profile: user.profile,
        createdAt: user.createdAt?.toString(),
        updatedAt: user.updatedAt?.toString(),
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw new BadRequestException(error.message);
      throw new InternalServerErrorException('Failed to verify user');
    }
  }

  refreshToken(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  logout(token: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
