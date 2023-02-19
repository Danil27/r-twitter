import { Gender } from '../enums/gender.enum';

export type CreateUserDto = {
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  password: string;
  email: string;
  username: string;
};
