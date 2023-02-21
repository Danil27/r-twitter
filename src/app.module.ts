import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TweetsModule } from './tweets/tweets.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore.redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    TweetsModule,
    HashtagsModule,
    LikesModule,
    CommentsModule,
    SubscriptionsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
