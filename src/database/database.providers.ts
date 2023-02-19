import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Accounts } from '../user/entities/account.entity';
import { Users } from '../user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],

    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
      });
      sequelize.addModels([Users, Accounts]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
