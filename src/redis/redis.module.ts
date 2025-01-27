import { RedisModule as NRedistModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service";



@Module({
  imports: [
    NRedistModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}