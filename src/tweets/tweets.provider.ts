import { HashtagsTweets } from './entities/hashtags_tweets.entity';
import { Tweets } from './entities/tweets.entity';

export const tweetsProviders = [
  { provide: 'TweetsRepository', useValue: Tweets },
  { provide: 'HashtagsTweetsRepository', useValue: HashtagsTweets },
];
