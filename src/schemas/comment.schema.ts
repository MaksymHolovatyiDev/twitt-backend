import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ required: true })
  text: string;

  @Prop()
  name: string;

  @Prop()
  userCommentId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
