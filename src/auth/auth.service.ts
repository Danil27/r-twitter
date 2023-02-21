import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dao/sign-up.dto';
import { TokenDto } from './dao/token.dto';
import { SignInDto } from './dao/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/services/user.service';
import { UpdPasswordDto } from './dao/upd-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsType } from '../notifications/enums/notifications-type.enum';
import { NotificationCreateEvent } from '../notifications/dto/create-notification.dto';

@Injectable()
export class AuthService {
  private readonly jwt_secret;
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    this.jwt_secret = this.configService.get('jwt_secret');
  }

  public async updatePassword(userId: number, data: UpdPasswordDto) {
    const { password, new_password } = data;
    const account = await this.usersService.findAccountByUserID(userId);
    if (!account) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, account.password)))
      throw new HttpException(
        'Password was entered incorrectly',
        HttpStatus.UNAUTHORIZED,
      );
    await this.usersService.updatePassword(userId, new_password);
    return true;
  }

  public async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
    const { id } = await this.usersService.create({
      ...signUpDto,
      password: await bcrypt.hash(signUpDto.password, 10),
    });

    this.eventEmitter.emit('system.register', {
      type: NotificationsType.SYSTEM,
      toUserId: id,
    } as NotificationCreateEvent);

    return this.generateTokens(id);
  }

  public async signIn(signInDto: SignInDto): Promise<TokenDto> {
    const user = signInDto.email
      ? await this.usersService.findByEmail(signInDto.email)
      : await this.usersService.findByUsername(signInDto.username);

    if (!user)
      throw new HttpException(
        'No user with such authorization data was found',
        HttpStatus.NOT_FOUND,
      );

    if (!(await bcrypt.compare(signInDto.password, user.password)))
      throw new HttpException(
        'Password was entered incorrectly',
        HttpStatus.UNAUTHORIZED,
      );

    return this.generateTokens(user.userId);
  }

  private generateTokens(userId: number): TokenDto {
    return {
      access_token: this.jwtService.sign(
        { id: userId },
        { secret: this.jwt_secret },
      ),
    };
  }
}
