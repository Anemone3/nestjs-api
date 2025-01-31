import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/domain/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
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
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(HttpStatus.OK).json({message:'User verified',user})
  }
}
