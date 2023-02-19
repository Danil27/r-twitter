import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({
    description: 'User Email',
    nullable: false,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    nullable: false,
    required: true,
  })
  username: string;

  @MinLength(6)
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;
}
