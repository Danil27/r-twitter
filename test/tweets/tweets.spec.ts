import { httpClient } from '../jest.setup';
import { IlyaUser } from '../fixtures/users';
import { TestTweet } from '../fixtures/tweets';

describe('Tweets', () => {
  let access_token;
  let tweetId;
  it('Auth creator', async () => {
    const res = await httpClient.post('/auth/sign-up').send({
      email: IlyaUser.email,
      password: IlyaUser.password,
      username: IlyaUser.username,
    });

    expect(res.body).toHaveProperty('access_token');
    access_token = res.body.access_token;

    const { status, body } = await httpClient
      .post('/tweets')
      .send(TestTweet)
      .set('Authorization', 'Bearer ' + access_token);
    tweetId = body.id;
    expect(status).toEqual(201);
  });

  it('Fine tweet by id', async () => {
    const { status } = await httpClient.get('/tweets/' + tweetId);
    expect(status).toEqual(200);
  });

  it('Search tweet by title', async () => {
    const { status } = await httpClient.get(
      '/tweets/search/title/' + TestTweet.title,
    );
    expect(status).toEqual(200);
  });

  it('Search tweet by hashtag', async () => {
    const { status } = await httpClient.get(
      '/tweets/search/hashtag/' + TestTweet.hashtags[0],
    );
    expect(status).toEqual(200);
  });

  it('Find all tweets', async () => {
    const { status } = await httpClient.get('/tweets/all/0');
    expect(status).toEqual(200);
  });
});
