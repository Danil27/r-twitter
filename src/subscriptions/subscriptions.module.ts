import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { subscriptionsProviders } from './subscriptions.provider';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [...subscriptionsProviders, SubscriptionsService],
})
export class SubscriptionsModule {}
