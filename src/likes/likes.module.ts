import { Module } from '@nestjs/common';
import { TweetsModule } from '../tweets/tweets.module';
import { UserModule } from '../users/user.module';
import { LikesController } from './likes.controller';
import { likesProviders } from './likes.provider';
import { LikesService } from './likes.service';

@Module({
  imports: [UserModule, TweetsModule],
  controllers: [LikesController],
  providers: [...likesProviders, LikesService],
})
export class LikesModule {}
