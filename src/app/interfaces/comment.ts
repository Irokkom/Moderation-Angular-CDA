import { Article } from './article';
import { User } from './user';

export interface Comment {
    id: number;
    content: string;
    commentAuthor: User | null;
    createdAt: Date;
    article: Article;
    status: string;
  }
