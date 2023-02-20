import { Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { Users } from '../users/entities/user.entity';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':tweetId')
  @ApiOperation({ summary: 'Like tweet' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async like(
    @CurrentUser() user: Users,
    @Param('tweetId') tweetId: number,
  ) {
    return await this.likesService.like(user.id, tweetId);
  }

  @Get('is-like/:tweetId')
  @ApiOperation({ summary: 'Is it like' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async isLike(
    @CurrentUser() user: Users,
    @Param('tweetId') tweetId: number,
  ) {
    return await this.likesService.isLike(user.id, tweetId);
  }
}
