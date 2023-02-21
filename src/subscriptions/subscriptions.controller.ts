import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { Users } from '../users/entities/user.entity';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('Subscriptions')
@Controller('sub')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('subscribe/:authorId')
  @ApiOperation({ summary: 'Subscribe to the author' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async subscribe(
    @CurrentUser() user: Users,
    @Param('authorId') authorId: number,
  ) {
    return await this.subscriptionsService.subscribe(user.id, authorId);
  }

  @Post('unsubscribe/:authorId')
  @ApiOperation({ summary: 'Unfollow the author' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async unsubscribe(
    @CurrentUser() user: Users,
    @Param('authorId') authorId: number,
  ) {
    return await this.subscriptionsService.unsubscribe(user.id, authorId);
  }

  @Get('subscriptions/:userId')
  @ApiOperation({ summary: 'Get subscriptions' })
  public async findSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @Get('subscribers/:userId')
  @ApiOperation({ summary: 'Get subscriptions' })
  public async findSubscribers(@Param('userId') userId: number) {
    return this.subscriptionsService.getSubscribers(userId);
  }
}
