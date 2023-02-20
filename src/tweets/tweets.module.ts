import { Module } from '@nestjs/common';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { UserModule } from '../users/user.module';
import { TweetsController } from './tweets.controller';
import { tweetsProviders } from './tweets.provider';
import { TweetsService } from './tweets.service';

@Module({
  imports: [UserModule, HashtagsModule],
  controllers: [TweetsController],
  providers: [...tweetsProviders, TweetsService],
  exports: [...tweetsProviders],
})
export class TweetsModule {}
