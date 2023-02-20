import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { LikesModule } from './likes/likes.module';
import { TweetsModule } from './tweets/tweets.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    TweetsModule,
    HashtagsModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
