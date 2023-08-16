export interface LogInBody {
  email: string;
  password: string;
}

export interface SignUpBody extends LogInBody {
  name: string;
}
