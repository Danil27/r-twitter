import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HashtagsService } from './hashtags.service';

@ApiTags('Hashtags')
@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Get('/topical')
  @ApiOperation({ summary: 'Get topical hashtags' })
  public async search() {
    return this.hashtagsService.getTopicalHashtags();
  }
}
