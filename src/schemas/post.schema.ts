import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({ required: true })
  text: string;

  @Prop({ default: '' })
  img: string;

  @Prop({ default: [] })
  likes: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
