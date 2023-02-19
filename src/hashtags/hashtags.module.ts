import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { HashtagsController } from './hashtags.controller';
import { hashtagsProviders } from './hashtags.providers';
import { HashtagsService } from './hashtags.service';

@Module({
  imports: [UserModule],
  controllers: [HashtagsController],
  providers: [HashtagsService, ...hashtagsProviders],
  exports: [HashtagsService, ...hashtagsProviders],
})
export class HashtagsModule {}
