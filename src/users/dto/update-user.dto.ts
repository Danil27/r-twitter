import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDto {
  @ApiProperty({
    description: 'firstname',
    nullable: true,
    required: false,
  })
  firstname?: string;

  @ApiProperty({
    description: 'lastname',
    nullable: true,
    required: false,
  })
  lastname?: string;

  @ApiProperty({
    description: 'gender',
    nullable: true,
    required: false,
    enum: Gender,
  })
  gender?: Gender;
}
