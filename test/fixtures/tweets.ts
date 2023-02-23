import { CreateTweetDto } from 'src/tweets/dto/create-tweet.dto';

export type TweetsFixture = Partial<CreateTweetDto>;

export const TestTweet: TweetsFixture = {
  title: 'Test tweet',
  body: 'Test tweet body',
  hashtags: ['news'],
};

export const tweetsFixture = [TestTweet];
