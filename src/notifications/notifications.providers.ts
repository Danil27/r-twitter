import { Notifications } from './notifications.entity';

export const notificationsProviders = [
  { provide: 'NotificationsRepository', useValue: Notifications },
];
