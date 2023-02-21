import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '../users/entities/user.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('')
  @ApiOperation({ summary: 'Get new notifications' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async getNewNotifications(@CurrentUser() user: Users) {
    return this.notificationsService.findNotifications(user.id);
  }

  @Put('read/:notificationId')
  @ApiOperation({ summary: 'Read notification' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async readNotification(
    @CurrentUser() user: Users,
    @Param('notificationId') notificationId: number,
  ) {
    return this.notificationsService.readNotification(user.id, notificationId);
  }
}
