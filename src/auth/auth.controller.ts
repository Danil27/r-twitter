import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dao/sign-up.dto';
import { TokenDto } from './dao/token.dto';
import { SignInDto } from './dao/sign-in.dto';
import { CurrentUser } from '../helpers/request.helper';
import { UpdPasswordDto } from './dao/upd-password.dto';
import { Users } from '../users/entities/user.entity';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Registers a user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User with such email already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email must be an email',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'password must be longer than or equal to 6 characters',
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<TokenDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Authorizes user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No user with such authorization data was found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password was entered incorrectly',
  })
  async signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
    return this.authService.signIn(signInDto);
  }

  @Put('password')
  @ApiOperation({ summary: 'Password update' })
  @ApiBody({ type: UpdPasswordDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TokenDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No user with such authorization data was found',
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updPassword(
    @CurrentUser() user: Users,
    @Body() data: UpdPasswordDto,
  ): Promise<boolean> {
    return this.authService.updatePassword(user.id, data);
  }
}
