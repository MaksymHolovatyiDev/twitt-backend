import { Injectable } from '@nestjs/common';
import { LogInBody, SignUpBody } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  LogIn(body: LogInBody): string {
    const { email, password } = body;

    return 'token';
  }

  SignUp(body: SignUpBody): string {
    const { email, password, name } = body;

    return 'token';
  }
}
