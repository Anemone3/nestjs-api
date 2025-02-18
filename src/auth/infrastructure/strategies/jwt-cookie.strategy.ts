import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/domain/jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['accessToken'];
        },
      ]),
      secretOrKey: configService.get<string>('jwt.JWT_ACCESS_SECRET')!,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) throw new UnauthorizedException('Unauthorized, Invalid token');

    const user = await this.userService.findOne(payload.sub);

    if (!user)
      throw new NotFoundException('No se pudo encontrar el usuario, verifique si los datos no fueron cambiados');

    const { password, ...userInfo } = user;

    return userInfo;
  }
}
