import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthLogInDto, CreateAuthSingUpDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('LogIn')
  LogIn(@Body() createAutLogInhDto: CreateAuthLogInDto): string {
    return this.appService.LogIn(createAutLogInhDto);
  }

  @Post('SignUp')
  SignUp(@Body() createAuthSignUpDto: CreateAuthSingUpDto): string {
    return this.appService.SignUp(createAuthSignUpDto);
  }
}
