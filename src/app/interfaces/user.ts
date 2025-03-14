import { Article } from "./article";  

   export interface User {
    id: number;
    email: string;
    roles: string[];
    password: string;
    username: string;
    articles: Article[];
  }
  