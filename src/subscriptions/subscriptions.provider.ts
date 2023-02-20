import { Subscriptions } from './subscriptions.entity';

export const subscriptionsProviders = [
  { provide: 'SubscriptionsRepository', useValue: Subscriptions },
];
