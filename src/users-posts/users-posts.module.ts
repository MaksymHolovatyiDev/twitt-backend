import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from 'src/schemas/post.schema';
import { UserPostsController } from './users-posts.controller';
import { UsersPostsService } from './users-posts.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],

  controllers: [UserPostsController],
  providers: [UsersPostsService],
})
export class UsersPostsModule {}
