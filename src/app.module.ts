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
import { CategoryProductModule } from './categories/application/category-product.module';
import { OrderModule } from './order/application/order.module';
import { CartModule } from './cart/application/cart.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [() => EnvConfig],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
    ProductModule,
    OtpModule,
    EmailModule,
    CategoryProductModule,
    OrderModule,
    CartModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
