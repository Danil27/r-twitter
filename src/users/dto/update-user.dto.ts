import { Gender } from '../enums/gender.enum';

export type UpdateUserDto = {
  firstname?: string;
  lastname?: string;
  gender?: Gender;
};
