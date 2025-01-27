import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

interface OtpRepository {
  saveOtp(email: string): Promise<string>;
  verifyOtp(email: string, otp: string): Promise<boolean>;
}

@Injectable()
export class OtpService implements OtpRepository {
  constructor(private readonly redisService: RedisService) {}

  async saveOtp(email: string): Promise<string> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await this.redisService.set(email, otp, 300);

    return otp;
  }
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this.redisService.get(email);
    if (storedOtp === otp) {
      await this.redisService.del(email);
      return true;
    }

    return false;
  }
}
