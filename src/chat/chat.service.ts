import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Chat} from 'src/schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async GetAllComments() {
    return await this.chatModel
      .find({replied: false})
      .populate({path: 'user', select: 'name'})
      .select('Comments createdAt text user vote');
  }

  async AddComment(req, body) {
    const createdPost = new this.chatModel({
      text: body.text,
      user: req.userId,
    });

    return createdPost.save();
  }

  async EditComment(req, body) {
    const comment = await this.chatModel.findById(body._id);

    if (comment.user !== req.userId)
      throw new HttpException('Incorrect user!', HttpStatus.FORBIDDEN);

    return this.chatModel.findByIdAndUpdate(
      body._id,
      {text: body.text},
      {new: true},
    );
  }

  async DeleteComment(req, _id) {
    const comment = await this.chatModel.findById(_id);

    if (comment.user !== req.userId)
      throw new HttpException('Incorrect user!', HttpStatus.FORBIDDEN);

    return this.chatModel.findByIdAndDelete(_id);
  }

  async Reply(req, body) {
    const comment = await this.chatModel.findById(body._id);
  }

  async CommentVoteUp(req, _id) {
    const comment = await this.chatModel.findById(_id);

    if (comment?.UsersVotes && !comment?.UsersVotes.includes(req.userId))
      await this.chatModel.findByIdAndUpdate(_id, {
        vote: ++comment.vote,
        $push: {UsersVotes: req.userId},
      });

    return {message: 'Voted!'};
  }

  async CommentVoteDown(req, _id) {
    const comment = await this.chatModel.findById(_id);

    if (comment?.UsersVotes && !comment?.UsersVotes.includes(req.userId))
      await this.chatModel.findByIdAndUpdate(_id, {
        vote: --comment.vote,
        $push: {UsersVotes: req.userId},
      });

    return {message: 'Voted!'};
  }
}
