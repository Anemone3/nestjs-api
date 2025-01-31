import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailKeys } from 'src/config/app.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(MailKeys.host),
          port: configService.get<number>(MailKeys.port),
          secure: false,
          auth: {
            user: configService.get<string>(MailKeys.user),
            pass: configService.get<string>(MailKeys.pass),
          },
        },
        defaults: {
          from: `<${configService.get<string>(MailKeys.from)}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
