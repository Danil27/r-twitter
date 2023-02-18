import { Users } from '../entitys/user.entity';

export const usersProviders = [{ provide: 'UsersRepository', useValue: Users }];
