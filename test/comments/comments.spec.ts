import { httpClient } from '../jest.setup';
import { VasyaUser } from '../fixtures/users';
import { TestTweet } from '../fixtures/tweets';

describe('Comments', () => {
  let access_token;
  let tweetId;
  it('Auth creator', async () => {
    const res = await httpClient.post('/auth/sign-up').send({
      email: VasyaUser.email,
      password: VasyaUser.password,
      username: VasyaUser.username,
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

  it('New comment in tweet', async () => {
    const { status } = await httpClient
      .post('/comments/' + tweetId)
      .send({ comment: 'Test comment in this tweet' })
      .set('Authorization', 'Bearer ' + access_token);

    expect(status).toEqual(201);
  });

  it('Delete comment', async () => {
    const { body } = await httpClient.get('/tweets/' + tweetId);

    const { status } = await httpClient
      .delete('/comments/' + body.comments[0].id)
      .send({ comment: 'Test comment in this tweet' })
      .set('Authorization', 'Bearer ' + access_token);

    expect(status).toEqual(200);
  });
});
