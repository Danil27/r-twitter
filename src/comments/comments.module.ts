import { Module } from '@nestjs/common';
import { TweetsModule } from '../tweets/tweets.module';
import { UserModule } from '../users/user.module';
import { CommentsController } from './comments.controller';
import { commentsProviders } from './comments.provider';
import { CommentsService } from './comments.service';

@Module({
  imports: [UserModule, TweetsModule],
  controllers: [CommentsController],
  providers: [...commentsProviders, CommentsService],
})
export class CommentsModule {}
