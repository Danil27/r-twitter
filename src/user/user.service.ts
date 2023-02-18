import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
  ) {}

  public async create(data: CreateUserDto) {
    return this.usersRepository.create(data);
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
