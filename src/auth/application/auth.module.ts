import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisAuthRepositoryImpl } from '../infrastructure/auth.redis.repository';
import { EmailModule } from 'src/email/email.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports:[EmailModule,OtpModule],
  controllers: [AuthController],
  providers: [AuthService,{
    provide:'AuthRepository',
    useClass:RedisAuthRepositoryImpl
  }],
})
export class AuthModule {}
