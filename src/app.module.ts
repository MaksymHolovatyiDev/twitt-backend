import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { UsersPostsModule } from './users-posts/users-posts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_HOST),
    JwtModule.register({
      global: true,
      secret: process.env.KEY,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UsersPostsModule,
  ],
})
export class AppModule {}
