import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UpdPasswordDto {
  @MinLength(6)
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;

  @MinLength(6)
  @ApiProperty({
    description: 'New user password',
    nullable: false,
    required: true,
  })
  new_password: string;
}
