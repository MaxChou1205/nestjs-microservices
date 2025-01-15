import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // type: 'OAuth2',
      // user: this.configService.get('EMAIL_USER'),
      // clientId: this.configService.get('GMAIL_OAUTH_CLIENT_ID'),
      // clientSecret: this.configService.get('GMAIL_OAUTH_CLIENT_SECRET'),
      // refreshToken: this.configService.get('GMAIL_OAUTH_REFRESH_TOKEN'),
      user: this.configService.get('GMAIL_USER'),
      pass: this.configService.get('GMAIL_PASSWORD'),
    },
  });

  async notifyEmail({ email }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Hello from NestJS',
      text: 'Hello world!',
    });
  }
}
