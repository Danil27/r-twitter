import { httpClient } from '../jest.setup';
import { Kristy, Anna } from '../fixtures/users';
import { TestTweet } from '../fixtures/tweets';

describe('Subscriptions', () => {
  let access_token_anna;
  let access_token_krystina;
  let tweetId;

  it('Auth creator', async () => {
    const resIvan = await httpClient.post('/auth/sign-up').send({
      email: Anna.email,
      password: Anna.password,
      username: Anna.username,
    });

    const resSergey = await httpClient.post('/auth/sign-up').send({
      email: Kristy.email,
      password: Kristy.password,
      username: Kristy.username,
    });

    expect(resIvan.body).toHaveProperty('access_token');
    access_token_anna = resIvan.body.access_token;

    expect(resSergey.body).toHaveProperty('access_token');
    access_token_krystina = resSergey.body.access_token;
  });

  it('Follow', async () => {
    const { body } = await httpClient
      .get('/users/me')
      .set('Authorization', 'Bearer ' + access_token_anna);

    const { status } = await httpClient
      .post('/sub/subscribe/' + body.id)
      .set('Authorization', 'Bearer ' + access_token_krystina);

    expect(status).toEqual(201);
  });
});
