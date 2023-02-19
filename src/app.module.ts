import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { HashtagsModule } from './hashtags/hashtags.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
