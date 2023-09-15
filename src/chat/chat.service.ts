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
      .populate({
        path: 'Comments',
        populate: {
          path: 'user',
          select: 'name',
        },
      })
      .populate({path: 'user', select: 'name'})
      .select('Comments createdAt text user vote replied');
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

    if (!comment.replied) {
      await this.chatModel.deleteMany({_id: {$in: comment.Comments}});
    } else {
      await this.chatModel.findByIdAndUpdate(comment.Comments[0], {
        $pull: {Comments: comment._id},
      });
    }

    return this.chatModel.findByIdAndDelete(_id);
  }

  async Reply(req, body) {
    const comment = await this.chatModel.findById(body._id);

    if (!comment)
      throw new HttpException('Comment not found!', HttpStatus.BAD_REQUEST);

    if (comment.replied) {
      const createdPost = await new this.chatModel({
        text: body.text,
        user: req.userId,
        replied: true,
        Comments: comment.Comments,
      }).save();

      await this.chatModel.findByIdAndUpdate(comment.Comments[0], {
        $push: {Comments: createdPost._id},
      });

      return createdPost;
    }

    const createdPost = await new this.chatModel({
      text: body.text,
      user: req.userId,
      replied: true,
      Comments: [comment._id],
    }).save();

    await this.chatModel.findByIdAndUpdate(body._id, {
      $push: {Comments: createdPost._id},
    });

    return createdPost;
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
