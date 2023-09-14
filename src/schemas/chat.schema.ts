import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Types} from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
})
export class Chat {
  @Prop({required: true})
  text: string;

  @Prop({default: false})
  replied: boolean;

  @Prop({ref: 'User'})
  user: Types.ObjectId;

  @Prop({default: 0})
  vote: number;

  @Prop({default: []})
  UsersVotes: Types.ObjectId[];

  @Prop({default: [], ref: 'Chat'})
  Comments: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
