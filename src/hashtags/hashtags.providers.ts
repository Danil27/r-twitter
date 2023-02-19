import { Hashtags } from './entities/hashtags.entity';
import { HashtagsTweets } from './entities/hashtags_tweets.entity';

export const hashtagsProviders = [
  { provide: 'HashtagsRepository', useValue: Hashtags },
  { provide: 'HashtagsTweetsRepository', useValue: HashtagsTweets },

];
