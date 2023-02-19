import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { Users } from '../users/entities/user.entity';
import { CreateHashtagDto } from './dto/create-hashtags.dto';
import { Hashtags } from './entities/hashtags.entity';
import { HashtagsTweets } from './entities/hashtags_tweets.entity';

@Injectable()
export class HashtagsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof Users,
    @Inject('HashtagsRepository')
    private readonly hashtagsRepository: typeof Hashtags,
    @Inject('HashtagsTweetsRepository')
    private readonly hashtagsTweetsRepository: typeof HashtagsTweets,
  ) {}

  public async create(userId: number, data: CreateHashtagDto) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return this.hashtagsRepository.create({
      userId,
      ...data,
    });
  }

  public async findOrCreate(title: string, userId: number) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const [hashtag] = await this.hashtagsRepository.findOrCreate<Hashtags>({
      where: { title },
    });

    return hashtag.dataValues;
  }

  public async findById(id: number) {
    return await this.hashtagsRepository.findByPk(id);
  }

  public async getTopicalHashtags() {
    return await this.hashtagsTweetsRepository.findAll({
      include: [Hashtags],
      attributes: [
        'hashtag.title',
        [sequelize.fn('COUNT', sequelize.col('hashtag.id')), 'hashtag_count'],
      ],
      order: [['createdAt', 'ASC']],
      group: ['hashtag.id', 'createdAt'],
      limit: 5,
    });
  }
}
