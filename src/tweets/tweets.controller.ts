import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
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
import { CreateTweetDto } from './dto/create-tweet.dto';

import { TweetsService } from './tweets.service';
@ApiTags('Tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create tweet' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async create(
    @CurrentUser() user: Users,
    @Body() data: CreateTweetDto,
  ) {
    return await this.tweetsService.create(user.id, data);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  @ApiOperation({ summary: 'Find tweet by id' })
  public async findByID(@Param('id') id: number) {
    return this.tweetsService.findById(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('all/:offset')
  @ApiOperation({ summary: 'Find all tweets' })
  public async findAll(@Param('offset') offset: number) {
    return this.tweetsService.getTweets(offset);
  }

  @Get('/search/title/:title')
  @ApiOperation({ summary: 'Search tweet by title' })
  public async search(@Param('title') title: string) {
    return this.tweetsService.searchByTitle(title);
  }

  @Get('/search/hashtag/:hashtag')
  @ApiOperation({ summary: 'Search tweet by hashtag' })
  public async searchByHashtag(@Param('hashtag') hashtag: string) {
    return this.tweetsService.searchByHashtag(hashtag);
  }
}
