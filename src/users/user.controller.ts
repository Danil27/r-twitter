import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { UserService } from './services/user.service';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my profile' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async findMe(@CurrentUser() user: Users) {
    return this.userService.findById(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  public async findByID(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update profile' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async update(@CurrentUser() user: Users, @Body() data: UpdateUserDto) {
    return this.userService.update(user.id, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete profile' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  public async delete(@CurrentUser() user: Users) {
    return this.userService.delete(user.id);
  }
}
