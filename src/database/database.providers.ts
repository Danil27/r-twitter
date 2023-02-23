import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Likes } from '../likes/likes.entity';
import { Hashtags } from '../hashtags/entities/hashtags.entity';
import { HashtagsTweets } from '../hashtags/entities/hashtags_tweets.entity';
import { Tweets } from '../tweets/entities/tweets.entity';
import { Accounts } from '../users/entities/account.entity';
import { Users } from '../users/entities/user.entity';
import { Comments } from '../comments/comments.entity';
import { Subscriptions } from '../subscriptions/subscriptions.entity';
import { Notifications } from '../notifications/notifications.entity';

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
        logging: false,
      });
      sequelize.addModels([
        Users,
        Accounts,
        Hashtags,
        Tweets,
        HashtagsTweets,
        Likes,
        Comments,
        Subscriptions,
        Notifications,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
