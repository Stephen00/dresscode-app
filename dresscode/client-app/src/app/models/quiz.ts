import { ITag } from "./tag";
import { IQuestion } from "./question";
import { IMedia } from "./media";

export interface IQuiz {
  pk: number;
  title: string;
  media: IMedia | undefined;
  questions: IQuestion[];
  tags: ITag[];
  slug: string;
  answers: Map<number, string> | null;
  score: Number | null;
}
