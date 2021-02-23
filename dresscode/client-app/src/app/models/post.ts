import { IArticle } from "./article";
import { IPoll } from "./poll";
import { IQuiz } from "./quiz";

export interface IPost {
  id: number;
  content: IArticle | IPoll | IQuiz;
  description: string | undefined;
  reaction1_counter: number;
  reaction2_counter: number;
  reaction3_counter: number;
  object_id: number;
  created_at: Date;
  updated_at: Date;
  author: string;
  content_type: string;
}
