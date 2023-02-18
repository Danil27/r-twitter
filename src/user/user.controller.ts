import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async findByID(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post()
  public async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put()
  public async update(@Body() data: UpdateUserDto) {
    return this.userService.update(1, data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
