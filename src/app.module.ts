import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { EnvConfig } from './config/app.config';
import { OrderModule } from './order/order.module';
import { SeedModule } from './seed/seed.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryProductModule } from './categories/category-product.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';

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
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
