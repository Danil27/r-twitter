import { Likes } from './likes.entity';

export const likesProviders = [{ provide: 'LikesRepository', useValue: Likes }];
