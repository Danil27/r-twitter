import { HttpStatus } from '@nestjs/common';
import { SignInDto } from 'src/auth/dao/sign-in.dto';
import { SignUpDto } from 'src/auth/dao/sign-up.dto';
import { httpClient } from '../jest.setup';

import { MaxUser } from '../fixtures/users';

describe('Auth Integration', () => {
  describe('[POST] /auth/sign-up', () => {
    it('should register new user', async () => {
      const dto: SignUpDto = {
        email: MaxUser.email,
        password: MaxUser.password,
        username: MaxUser.username,
      };
      const { body } = await signUp(dto).expect(HttpStatus.CREATED);
      expect(body).toHaveProperty('access_token');
    });

    it('should return error when user with this email already exists', async () => {
      const dto: SignUpDto = {
        email: MaxUser.email,
        password: MaxUser.password,
        username: MaxUser.username,
      };

      await signUp(dto).expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: MaxUser.email,
      };

      const { body } = await signUp(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual([
        'password must be longer than or equal to 6 characters',
      ]);
    });
  });

  describe('[POST] /auth/sign-in', () => {
    it('should sign-in user by email and password', async () => {
      const dto: SignInDto = {
        email: MaxUser.email,
        password: MaxUser.password,
      };
      const { body } = await signIn(dto).expect(201);

      expect(body).toHaveProperty('access_token');
    });

    it('should return error when user doesnt exist', async () => {
      const dto: SignInDto = {
        email: 'not.existing.user@gmail.com',
        password: 'qwerty123',
      };

      const { body } = await signIn(dto).expect(HttpStatus.NOT_FOUND);

      expect(body.message).toEqual(
        'No user with such authorization data was found',
      );
    });

    it('should return validation error when no password specified', async () => {
      const dto = {
        email: 'not.existing.user@gmail.com',
      };

      const { body } = await signIn(dto).expect(HttpStatus.BAD_REQUEST);

      expect(body.message).toEqual(['password should not be empty']);
    });
  });
});

// eslint-disable-next-line
const signUp = (body: SignUpDto | any) => 
  httpClient.post('/auth/sign-up').send(body);

// eslint-disable-next-line
const signIn = (body: SignInDto | any) =>
  httpClient.post('/auth/sign-in').send(body);
