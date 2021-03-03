import { IMedia } from "./media";
import { ITag } from "./tag";

export interface IQuestion {
  id: number;
  question: string;
  answers: string[];
  media: IMedia | undefined;
  tags: ITag[];
}
