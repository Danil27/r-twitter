import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import sequelize, { Op } from 'sequelize';
import { Users } from '../users/entities/user.entity';
import { CreateHashtagDto } from './dto/create-hashtags.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
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
      defaults: { userId, title },
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
      group: ['hashtag.id'],
      limit: 5,
    });
  }

  public async update(userId, data: UpdateHashtagDto) {
    const { title, description, id } = data;
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const hashtag = await this.hashtagsRepository.findByPk<Hashtags>(id);
    if (!hashtag || hashtag.userId !== userId) {
      throw new HttpException('Hashtag not found.', HttpStatus.NOT_FOUND);
    }

    return this.hashtagsRepository.update(
      {
        title,
        description,
      },
      {
        where: { id },
      },
    );
  }

  public async delete(userId, hashtagId: number) {
    const user = await this.usersRepository.findByPk<Users>(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const hashtag = await this.hashtagsRepository.findByPk<Hashtags>(hashtagId);
    if (!hashtag || hashtag.userId !== userId) {
      throw new HttpException('Hashtag not found.', HttpStatus.NOT_FOUND);
    }
    return await this.hashtagsRepository.destroy({
      where: { id: hashtagId },
    });
  }

  public async searchByTitle(title: string) {
    return await this.hashtagsRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  }
}
