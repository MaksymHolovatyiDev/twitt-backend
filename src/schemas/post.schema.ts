import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({ required: true })
  text: string;

  @Prop({ default: [] })
  likes: string[];

  @Prop()
  name: string;

  @Prop({ default: [], ref: 'Comment' })
  comments: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
