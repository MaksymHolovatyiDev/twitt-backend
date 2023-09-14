import * as bcrypt from 'bcrypt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {JwtService} from '@nestjs/jwt';

import {User} from 'src/schemas/user.schema';
import {LogInBody, SignUpBody} from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async LogIn(body: LogInBody) {
    const {email, password} = body;

    const findByEmail = await this.userModel.findOne({email}).lean();

    if (!findByEmail)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const {_id, name, password: hashedPassword} = findByEmail;

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword)
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);

    return {
      _id,
      access_token: await this.jwtService.signAsync({
        _id,
        name,
        email,
      }),
    };
  }

  async SignUp(body: SignUpBody) {
    const {name, email, password} = body;

    const findByName = await this.userModel.findOne({name}).lean();
    const findByEmail = await this.userModel.findOne({email}).lean();

    if (findByName || findByEmail)
      throw new HttpException('Conflict', HttpStatus.CONFLICT);

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      ...body,
      password: hashedPassword,
    });

    await createdUser.save();

    return {
      _id: createdUser._id,
      access_token: await this.jwtService.signAsync({
        name,
        email,
        _id: createdUser._id,
      }),
    };
  }
}
