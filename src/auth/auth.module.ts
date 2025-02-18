import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { RedisAuthRepositoryImpl } from './infrastructure/auth.redis.repository';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt-cookie.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: 'jwt',
      }),
    }),
    JwtModule.register({}),
    EmailModule,
    OtpModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: RedisAuthRepositoryImpl,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
