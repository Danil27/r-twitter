import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { tweetsProviders } from './tweets.provider';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [...tweetsProviders],
})
export class TweetsModule {}
