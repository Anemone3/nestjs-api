import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface EmailRepository {
  sendEmail(destination: string, title: string, text: string, html: string): Promise<void>;
}

@Injectable()
export class EmailService implements EmailRepository {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(destination: string, title: string, text: string, html: string): Promise<void> {
    try {
      await this.mailService.sendMail({
        to: destination,
        subject: title,
        text: text,
        html: html,
      });
    } catch (error) {
      console.log(error);
      throw new MailErrorHandler('Error to send email');
    }
  }
}

export class MailErrorHandler extends Error {
  constructor(message: string) {
    super(message);
  }
}
