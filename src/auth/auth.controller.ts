import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthLogInDto, CreateAuthSingUpDto } from './dto/create-auth.dto';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('LogIn')
  LogIn(@Body() createAutLogInhDto: CreateAuthLogInDto) {
    return this.appService.LogIn(createAutLogInhDto);
  }

  @Post('SignUp')
  SignUp(@Body() createAuthSignUpDto: CreateAuthSingUpDto) {
    return this.appService.SignUp(createAuthSignUpDto);
  }
}
