import { httpClient } from '../jest.setup';
import { IvanUser, SergeyUser } from '../fixtures/users';
import { TestTweet } from '../fixtures/tweets';

describe('Notifications', () => {
  let access_token_Ivan;
  let access_token_Sergey;
  let tweetId;

  it('Auth creator', async () => {
    const resIvan = await httpClient.post('/auth/sign-up').send({
      email: IvanUser.email,
      password: IvanUser.password,
      username: IvanUser.username,
    });

    const resSergey = await httpClient.post('/auth/sign-up').send({
      email: SergeyUser.email,
      password: SergeyUser.password,
      username: SergeyUser.username,
    });

    expect(resIvan.body).toHaveProperty('access_token');
    access_token_Ivan = resIvan.body.access_token;

    expect(resSergey.body).toHaveProperty('access_token');
    access_token_Sergey = resSergey.body.access_token;

    const { status, body } = await httpClient
      .post('/tweets')
      .send(TestTweet)
      .set('Authorization', 'Bearer ' + access_token_Sergey);
    tweetId = body.id;
    expect(status).toEqual(201);
  });

  it('Check register notification', async () => {
    const { body } = await httpClient
      .get('/notifications/')
      .set('Authorization', 'Bearer ' + access_token_Sergey);

    expect(body[0].title).toBe('Hi, Serj!');
    expect(body[0].body).toBe('Welcome to r-twitter app!');
    expect(body[0].type).toBe('System');
    expect(body[0].fromUserId).toBe(null);

    //read notification
    const res = await httpClient
      .put('/notifications/read/' + body[0].id)
      .set('Authorization', 'Bearer ' + access_token_Sergey);

    expect(res.body).toBeTruthy();
  });

  it('New comment notification', async () => {
    jest.setTimeout(5000);
    const { status } = await httpClient
      .post('/comments/' + tweetId)
      .send({ comment: 'Test comment in this tweet' })
      .set('Authorization', 'Bearer ' + access_token_Ivan);

    expect(status).toEqual(201);

    const { body } = await httpClient
      .get('/notifications')
      .set('Authorization', 'Bearer ' + access_token_Sergey);

    expect(body[0].title).toBe('New comment');
    expect(body[0].body).toBe('Ivan commented your tweet.');
    expect(body[0].type).toBe('Comment');
    expect(body[0].isRead).toBe(false);
  });
});
