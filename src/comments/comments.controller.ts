import {
  Body,
  Controller,
  Delete,
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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':tweetId')
  @ApiOperation({ summary: 'Create comment' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async create(
    @CurrentUser() user: Users,
    @Param('tweetId') tweetId: number,
    @Body() data: CreateCommentDto,
  ) {
    return await this.commentsService.create(user.id, tweetId, data.comment);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Delete comment' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async delete(
    @CurrentUser() user: Users,
    @Param('commentId') commentId: number,
  ) {
    return await this.commentsService.delete(user.id, commentId);
  }
}
