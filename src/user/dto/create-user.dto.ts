import { Gender } from '../enums/gender.enum';

export type CreateUserDto = {
  firstname?: string;
  lastname?: string;
  gender?: Gender;
};
