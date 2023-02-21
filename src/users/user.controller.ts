import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../helpers/request.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { UserService } from './services/user.service';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
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

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  public async findByID(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update profile' })
  @UseGuards(JwtGuard)
  @ApiBody({ type: UpdateUserDto })
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
