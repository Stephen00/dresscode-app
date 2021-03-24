import { IMedia } from "./media";
import { ITag } from "./tag";

export interface IQuestion {
  pk: number;
  question: string;
  answers: string[];
  media: IMedia | undefined;
  tags: ITag[];
}
