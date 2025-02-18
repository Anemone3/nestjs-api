import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './infrastructure/dto';
import { GetRefreshToken } from './infrastructure/decorators/refresh-token.decorator';
import { UserActive } from './infrastructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify')
  async verifiyUser(@Body('otp') otp: string, @Body('email') email: string, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.verifiyUser(otp, email);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ message: 'User verified', user });
  }

  @Post('refresh-token')
  async refreshToken(@GetRefreshToken() refreshToken: string, @Res() res: Response) {
    const newAccessToken = await this.authService.refreshToken(refreshToken);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ message: 'token actualizado' });
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@UserActive() user: User) {
    const { password, role, ...infoUser } = user;

    return { ok: true, user: infoUser };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(HttpStatus.OK).json({ message: 'Logout successfully' });
  }
}
