import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { hashtagsProviders } from './hashtags.providers';
import { HashtagsService } from './hashtags.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [HashtagsService, ...hashtagsProviders],
  exports: [HashtagsService, ...hashtagsProviders],
})
export class HashtagsModule {}
