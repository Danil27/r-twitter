import { ApiProperty } from '@nestjs/swagger';

export class CreateTweetDto {
  @ApiProperty({
    description: 'Hashtags arr',
    nullable: true,
    required: false,
  })
  hashtags?: string[];

  @ApiProperty({
    description: 'Tweet title',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'Tweet body',
    required: true,
  })
  body: string;
}
