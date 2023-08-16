import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthLogInDto, CreateAuthSingUpDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('LogIn')
  LogIn(@Body() createAutLogInhDto: CreateAuthLogInDto) {
    return this.authService.LogIn(createAutLogInhDto);
  }

  @Post('SignUp')
  SignUp(@Body() createAuthSignUpDto: CreateAuthSingUpDto) {
    return this.authService.SignUp(createAuthSignUpDto);
  }
}
