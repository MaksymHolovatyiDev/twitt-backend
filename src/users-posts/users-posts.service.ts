import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersPostsService {
  constructor(
    @InjectModel(Post.name) private userPostsModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async GetAllPosts() {
    return await this.userPostsModel.aggregate([
      {
        $addFields: {
          liked: { $in: ['as', '$likes'] },
          likesNumber: { $size: '$likes' },
        },
      },
      {
        $project: {
          _id: 1,
          liked: 1,
          likesNumber: 1,
          img: 1,
          text: 1,
        },
      },
    ]);
  }

  GetUserPosts(req) {
    return this.userModel
      .findById(req.userId)
      .populate('posts')
      .select('posts');
  }

  async CreateUserPost(req, body) {
    const createdPost = new this.userPostsModel(body);

    await this.userModel.findByIdAndUpdate(req.userId, {
      $push: { posts: createdPost._id },
    });

    return createdPost.save();
  }

  async LikePost(req, body) {
    const { userId: id } = req;
    const liked = (await this.userPostsModel.findById(body._id)).likes.includes(
      id
    );

    return liked
      ? this.userPostsModel.findByIdAndUpdate(
          body._id,
          { $pull: { likes: id } },
          { new: true }
        )
      : this.userPostsModel.findByIdAndUpdate(
          body._id,
          { $push: { likes: id } },
          { new: true }
        );
  }

  async addComment(req, body) {
    const { _id, comment } = body;
    const { userId } = req;

    // await this.userPostsModel.findByIdAndUpdate(_id, {
    //   $push: { comments: createdPost._id },
    // });
  }

  getPostComments(body) {
    const { _id } = body;
  }
}
