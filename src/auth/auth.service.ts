import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dao/sign-up.dto';
import { TokenDto } from './dao/token.dto';
import { SignInDto } from './dao/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/services/user.service';

@Injectable()
export class AuthService {
  private readonly jwt_secret;
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwt_secret = this.configService.get('jwt_secret');
  }

  async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
    const { id } = await this.usersService.create({
      ...signUpDto,
      password: await bcrypt.hash(signUpDto.password, 10),
    });

    return this.generateTokens(id);
  }

  async signIn(signInDto: SignInDto): Promise<TokenDto> {
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

    return this.generateTokens(user.user_id);
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
