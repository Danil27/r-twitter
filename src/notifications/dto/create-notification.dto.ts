import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationsType } from '../enums/notifications-type.enum';

export type NotificationCreateEvent = {
  title?: string;
  body?: string;
  type: NotificationsType;
  isRead?: boolean;
  fromUserId?: number;
  toUserId: number;
};
