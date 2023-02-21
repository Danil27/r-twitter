import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
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
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { Users } from '../users/entities/user.entity';
import { HashtagsService } from './hashtags.service';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

@ApiTags('Hashtags')
@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('/topical')
  @ApiOperation({ summary: 'Get topical hashtags' })
  public async topical() {
    return this.hashtagsService.getTopicalHashtags();
  }

  @Put()
  @ApiOperation({ summary: 'Update hashtag' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async update(
    @CurrentUser() user: Users,
    @Body('id') data: UpdateHashtagDto,
  ) {
    return this.hashtagsService.update(user.id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete hashtag' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async delete(@CurrentUser() user: Users, @Param('id') id: number) {
    return this.hashtagsService.delete(user.id, id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('/search/:title')
  @ApiOperation({ summary: 'Search hashtag by title' })
  public async searchByTitle(@Param('title') title: string) {
    return this.hashtagsService.searchByTitle(title);
  }
}
