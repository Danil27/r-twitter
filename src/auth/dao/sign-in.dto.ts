import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ValidateIf((data) => !data.username)
  @ApiProperty({
    description: 'User Email',
    nullable: false,
    required: false,
  })
  email?: string;

  @IsNotEmpty()
  @ValidateIf((data) => !data.email)
  @ApiProperty({
    description: 'Username',
    nullable: false,
    required: false,
  })
  username?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;
}
