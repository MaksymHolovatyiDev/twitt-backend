import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ChatController} from './chat.controller';
import {ChatService} from './chat.service';
import {User, UserSchema} from 'src/schemas/user.schema';
import {Chat, ChatSchema} from 'src/schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}]),
  ],

  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
