import { Tweets } from './entities/tweets.entity';

export const tweetsProviders = [
  { provide: 'TweetsRepository', useValue: Tweets },
];
