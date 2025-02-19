import { RedisModule as NRedistModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service";
import { EnvsKeys } from "src/config/app.config";



@Module({
  imports: [
    NRedistModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>(EnvsKeys.redisUrl),
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}