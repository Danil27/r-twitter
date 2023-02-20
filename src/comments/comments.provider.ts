import { Comments } from './comments.entity';

export const commentsProviders = [
  { provide: 'CommentsRepository', useValue: Comments },
];
