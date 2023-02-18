import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dao/sign-up.dto';
import { TokenDto } from './dao/token.dto';
import { SignInDto } from './dao/sign-in.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  // private readonly jwt_secret;
  // constructor(
  //   private readonly usersService: UsersService,
  //   private readonly jwtService: JwtService,
  //   private configService: ConfigService,
  // ) {
  //   this.jwt_secret = this.configService.get('jwt_secret');
  // }

  // async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
  //   const { id } = await this.usersService.create({
  //     ...signUpDto,
  //   });

  //   return this.generateTokens(id);
  // }

  // async signIn(signInDto: SignInDto): Promise<TokenDto> {
  //   const user = signInDto.email
  //     ? await this.usersService.findByEmail(signInDto.email)
  //     : await this.usersService.findByUsername(signInDto.username);

  //   if (!user)
  //     throw new HttpException(
  //       'No user with such authorization data was found',
  //       HttpStatus.NOT_FOUND,
  //     );

  //   // TODO: Добавить блокировку при многократном неверном вводе пароля.
  //   if (!(await bcrypt.compare(signInDto.password, user.password)))
  //     throw new HttpException(
  //       'Password was entered incorrectly',
  //       HttpStatus.UNAUTHORIZED,
  //     );

  //   return this.generateTokens(user.id);
  // }

  // private generateTokens(userId: number): TokenDto {
  //   return {
  //     access_token: this.jwtService.sign(
  //       { id: userId },
  //       { secret: this.jwt_secret },
  //     ),
  //     refresh_token: this.jwtService.sign(
  //       { id: userId },
  //       { secret: this.jwt_secret, expiresIn: '30d' },
  //     ),
  //   };
  // }

  // public async googleSignIn(googleSignInDto: GoogleSignInDto) {
  //   const user = await this.usersService.findByCredentials({
  //     googleId: googleSignInDto.googleId,
  //     email: googleSignInDto.email
  //   });

  //   if (!!user) {
  //     return {
  //       access_token: this.generateTokens(user.id)
  //     };
  //   } else {
  //     const { id } = await this.usersService.create({
  //       email: googleSignInDto.email,
  //       googleId: googleSignInDto.googleId,
  //       firstName: googleSignInDto.fullname.split(' ')[0]
  //     })
  //     return {
  //       access_token: this.generateTokens(id)
  //     }
  //   }
  // }
}
