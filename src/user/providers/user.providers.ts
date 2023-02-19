import { Accounts } from '../entities/account.entity';
import { Users } from '../entities/user.entity';

export const usersProviders = [
  { provide: 'UsersRepository', useValue: Users },
  { provide: 'AccountsRepository', useValue: Accounts },
];
