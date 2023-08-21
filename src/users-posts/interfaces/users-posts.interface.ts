export interface mainRequest {
  userId: string;
}

export interface LikeBody {
  _id: string;
}

export interface CommentBody extends LikeBody {
  text: string;
}
