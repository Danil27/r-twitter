import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { SubscriptionsListener } from './listeners/subscriptions.listener';
import { SystemListener } from './listeners/system.listener';
import { TweetListener } from './listeners/tweet.listener';
import { NotificationsController } from './notifications.controller';
import { notificationsProviders } from './notifications.providers';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [UserModule],
  controllers: [NotificationsController],
  providers: [
    ...notificationsProviders,
    NotificationsService,
    TweetListener,
    SystemListener,
    SubscriptionsListener,
  ],
})
export class NotificationsModule {}
