import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/application/auth.module';
import { UserModule } from './user/application/user.module';
import { ProductModule } from './product/application/product.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { EnvConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load:[()=>EnvConfig]
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
    ProductModule,
    OtpModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
