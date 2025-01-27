import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';



@Injectable()
export class RedisService implements OnModuleInit {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  onModuleInit() {
    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });
    this.redis.on('ready', () => {
      console.log('Redis connection is ready');
    });

    this.redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    this.redis.on('end', () => {
      console.log('Redis connection closed');
    });
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }
}
