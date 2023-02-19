import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Accounts } from '../entities/account.entity';
import { Users } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('AccountsRepository')
    private readonly accountsRepository: typeof Accounts,
  ) {}

  public async create(data: CreateUserDto) {
    return this.usersRepository.create(
      {
        firstName: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
        account: {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      },
      {
        include: [Accounts],
      },
    );
  }

  public async findByEmail(email: string) {
    return await this.accountsRepository.findOne({
      where: { email },
    });
  }

  public async findByUsername(username: string) {
    return await this.accountsRepository.findOne({
      where: { username },
    });
  }

  public async findAccountByUserID(userId: number) {
    return await this.accountsRepository.findOne({
      where: {
        userId,
      },
    });
  }

  public async update(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<Users>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return this.usersRepository.update(data, {
      where: { id },
    });
  }

  public async updatePassword(userId: number, password: string) {
    const account = await this.accountsRepository.findOne<Accounts>({
      where: {
        userId,
      },
    });
    if (!account) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    await this.accountsRepository.update(
      {
        password,
      },
      {
        where: { userId },
      },
    );
    return true;
  }

  public async findById(id: number) {
    const user = await this.usersRepository.findByPk<Users>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async delete(id: number) {
    const user = await this.usersRepository.findByPk<Users>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return this.usersRepository.destroy({
      where: { id },
    });
  }
}
