import { Accounts } from '../../src/users/entities/account.entity';
import { Users } from '../../src/users/entities/user.entity';

export type UserFixture = Partial<Users & Accounts>;

export const MaxUser: UserFixture = {
  id: 1,
  lastname: 'Max',
  email: 'dmitrii77@gmail.com',
  username: 'itmax',
  // qwerty123
  password: 'qwerty123',
};

export const IlyaUser: UserFixture = {
  id: 2,
  lastname: 'Ilya',
  email: 'ilya200@gmail.com',
  username: 'ilya',
  // qwerty123
  password: 'qwerty123',
};

export const VasyaUser: UserFixture = {
  id: 3,
  lastname: 'Vasya',
  email: 'vasilii01@gmail.com',
  username: 'vasya',
  password: 'qwerty123',
};

export const PetrUser: UserFixture = {
  id: 3,
  lastname: 'Petr',
  email: 'petr@gmail.com',
  username: 'petya',
  password: 'qwerty123',
};

export const IvanUser: UserFixture = {
  id: 4,
  lastname: 'Ivan',
  email: 'Ivan@gmail.com',
  username: 'Ivan',
  password: 'qwerty123',
};

export const SergeyUser: UserFixture = {
  id: 5,
  lastname: 'Serj',
  email: 'Serj@gmail.com',
  username: 'Serj',
  password: 'qwerty123',
};

export const Anna: UserFixture = {
  id: 6,
  lastname: 'Anna',
  email: 'anya@gmail.com',
  username: 'annya',
  password: 'qwerty123',
};

export const Kristy: UserFixture = {
  id: 7,
  lastname: 'Kristy',
  email: 'krys@gmail.com',
  username: 'kristy',
  password: 'qwerty123',
};

export const usersFixture = [
  MaxUser,
  IlyaUser,
  VasyaUser,
  PetrUser,
  IvanUser,
  SergeyUser,
];
