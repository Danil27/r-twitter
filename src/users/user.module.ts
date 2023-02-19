import { Module } from '@nestjs/common';
import { usersProviders } from './providers/user.providers';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService, ...usersProviders],
})
export class UserModule {}
