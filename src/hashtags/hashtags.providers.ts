import { Hashtags } from './entities/hashtags.entity';

export const hashtagsProviders = [
  { provide: 'HashtagsRepository', useValue: Hashtags },
];
