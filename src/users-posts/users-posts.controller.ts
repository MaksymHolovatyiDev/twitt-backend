import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersPostsService } from './users-posts.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateLikeDto, CreatePostDto } from './dto/create-users-posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(AuthGuard)
export class UserPostsController {
  constructor(private readonly userPostsService: UsersPostsService) {}

  @Get('all')
  GetAllPosts(@Req() request) {
    return this.userPostsService.GetAllPosts(request);
  }

  @Get('user')
  GetUserPosts(@Req() request) {
    return this.userPostsService.GetUserPosts(request);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  CreateUserPost(@Req() request, @Body() createPostDto: CreatePostDto) {
    return this.userPostsService.CreateUserPost(request, createPostDto);
  }

  @Patch('like')
  LikePost(@Req() request, @Body() createLikeDto: CreateLikeDto) {
    return this.userPostsService.LikePost(request, createLikeDto);
  }
}
