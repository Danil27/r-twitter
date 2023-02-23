import { httpClient } from '../jest.setup';
import { PetrUser } from '../fixtures/users';
import { TestTweet } from '../fixtures/tweets';

describe('Likes', () => {
  let access_token;
  let tweetId;
  it('Auth creator', async () => {
    const res = await httpClient.post('/auth/sign-up').send({
      email: PetrUser.email,
      password: PetrUser.password,
      username: PetrUser.username,
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

  it('New like in tweet', async () => {
    const { status } = await httpClient
      .post('/likes/' + tweetId)
      .set('Authorization', 'Bearer ' + access_token);

    expect(status).toEqual(201);
  });

  it('Check like', async () => {
    const { body } = await httpClient.get('/tweets/' + tweetId);

    expect(body.likes.length).toBeTruthy();

    const res = await httpClient
      .post('/likes/is-like/' + tweetId)
      .set('Authorization', 'Bearer ' + access_token);

    expect(res.body).toBeTruthy();
  });
});
