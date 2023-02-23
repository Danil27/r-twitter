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
export const usersFixture = [MaxUser, IlyaUser, VasyaUser, PetrUser];
