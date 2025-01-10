import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: any, response: Response) {
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    response.cookie('nestjs-jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600),
    });
  }
}
