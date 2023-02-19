import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Hashtags } from '../hashtags/entities/hashtags.entity';
import { HashtagsTweets } from '../tweets/entities/hashtags_tweets.entity';
import { Tweets } from '../tweets/entities/tweets.entity';
import { Accounts } from '../users/entities/account.entity';
import { Users } from '../users/entities/user.entity';

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
      sequelize.addModels([Users, Accounts, Hashtags, Tweets, HashtagsTweets]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
