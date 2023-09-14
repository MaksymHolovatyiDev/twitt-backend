import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Body,
  Req,
  Param,
} from '@nestjs/common';

import {ChatService} from './chat.service';
import {AuthGuard} from 'src/guard/auth.guard';
import {CreateCommentDto, EditDto, VoteDto} from './dto/chat.dto';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('all')
  GetAllPosts() {
    return this.chatService.GetAllComments();
  }

  @Post('add')
  AddComment(@Req() request, @Body() createCommentDto: CreateCommentDto) {
    return this.chatService.AddComment(request, createCommentDto);
  }

  @Delete('delete/:id')
  DeleteComment(@Req() request, @Param('id') _id: string) {
    return this.chatService.DeleteComment(request, _id);
  }

  @Patch('edit')
  EditComment(@Req() request, @Body() EditCommentDto: EditDto) {
    return this.chatService.EditComment(request, EditCommentDto);
  }

  @Post('reply')
  Reply(@Req() request, @Body() EditCommentDto: EditDto) {
    return this.chatService.Reply(request, EditCommentDto);
  }

  @Patch('voteUp')
  CommentVoteUp(@Req() request, @Body() voteUpCommentDto: VoteDto) {
    return this.chatService.CommentVoteUp(request, voteUpCommentDto);
  }

  @Patch('voteDown')
  CommentVoteDown(@Req() request, @Body() voteDownCommentDto: VoteDto) {
    return this.chatService.CommentVoteDown(request, voteDownCommentDto);
  }
}
