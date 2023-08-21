import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';
import {
  CommentBody,
  LikeBody,
  mainRequest,
} from './interfaces/users-posts.interface';

@Injectable()
export class UsersPostsService {
  constructor(
    @InjectModel(Post.name) private userPostsModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}

  async GetAllPosts(req: mainRequest) {
    return await this.userPostsModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'comments',
        },
      },
      {
        $addFields: {
          isLiked: { $in: [req.userId, '$likes'] },
          likesNumber: { $size: '$likes' },
          commentsNumber: { $size: '$comments' },
        },
      },
      {
        $project: {
          _id: 1,
          isLiked: 1,
          likesNumber: 1,
          commentsNumber: 1,
          name: 1,
          text: 1,
          comments: {
            text: 1,
            name: 1,
            _id: 1,
          },
        },
      },
    ]);
  }

  GetUserPosts(req: mainRequest) {
    return this.userModel.findById(req.userId).select('name');
  }

  async CreateUserPost(req, body) {
    const user = await this.userModel.findById(req.userId);

    const createdPost = new this.userPostsModel({ ...body, name: user.name });

    await this.userModel.findByIdAndUpdate(req.userId, {
      $push: { posts: createdPost._id },
    });

    return createdPost.save();
  }

  async LikePost(req: mainRequest, body: LikeBody) {
    const { _id } = body;
    const { userId: id } = req;
    const liked = (await this.userPostsModel.findById(_id)).likes.includes(id);

    liked
      ? await this.userPostsModel.findByIdAndUpdate(_id, {
          $pull: { likes: id },
        })
      : await this.userPostsModel.findByIdAndUpdate(_id, {
          $push: { likes: id },
        });

    return { liked: !liked };
  }

  async addComment(req: mainRequest, body: CommentBody) {
    const { _id, text } = body;
    const { userId } = req;

    const user = await this.userModel.findById(userId);

    const createdComment = new this.commentModel({
      text,
      name: user.name,
      userCommentId: userId,
    });

    await this.userPostsModel.findByIdAndUpdate(_id, {
      $push: { comments: createdComment._id },
    });

    return createdComment.save();
  }
}
