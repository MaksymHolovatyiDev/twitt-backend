import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const token = request.headers.authorization;

    const [bearer, accessToken] = token.split(' ');

    if (!token || bearer != 'Bearer' || !accessToken) return false;

    const data = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.KEY,
    });

    const user = await this.userModel.findById({ _id: data._id });

    if (!user || !data) return false;

    request.userId = data._id;

    return true;
  }
}
