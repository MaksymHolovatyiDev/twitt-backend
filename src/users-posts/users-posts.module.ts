import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from 'src/schemas/post.schema';
import { UserPostsController } from './users-posts.controller';
import { UsersPostsService } from './users-posts.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserPostsController],
  providers: [UsersPostsService],
})
export class UsersPostsModule {}
