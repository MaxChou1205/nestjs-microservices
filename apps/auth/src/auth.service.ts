import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './users/interfaces/token-payload.interface';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ) {}

  async login(user: any, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = await this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600),
    });

    this.notificationClient.emit('notify_email', { email: user.email });

    return token;
  }
}
