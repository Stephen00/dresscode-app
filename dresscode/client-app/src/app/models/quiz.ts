import { ITag } from "./tag";
import { IQuestion } from "./question";

export interface IQuiz {
  pk: number;
  title: string;
  // TODO add media
  questions: IQuestion[];
  tags: ITag[];
  slug: string;
}
