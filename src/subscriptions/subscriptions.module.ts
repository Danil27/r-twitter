import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { SubscriptionsController } from './subscriptions.controller';
import { subscriptionsProviders } from './subscriptions.provider';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [UserModule],
  controllers: [SubscriptionsController],
  providers: [...subscriptionsProviders, SubscriptionsService],
})
export class SubscriptionsModule {}
