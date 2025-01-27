import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/domain/dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email:string,@Body('password') password:string) {
    return this.authService.login(email,password);
  }


  @Post('register')
  async register(@Body() createUserDto:CreateUserDto) {
    return this.authService.register(createUserDto);
  }

}
