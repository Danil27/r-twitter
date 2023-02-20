import { ApiProperty } from '@nestjs/swagger';

export class UpdateHashtagDto {
  @ApiProperty({
    description: 'Hashtags id',
    nullable: false,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Hashtags title',
    nullable: true,
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Hashtags description',
    nullable: true,
    required: false,
  })
  description?: string;
}
