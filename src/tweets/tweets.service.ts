import { Inject, Injectable } from '@nestjs/common';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class TweetsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
  ) {}

  public async create() {}
}
