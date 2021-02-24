
import { ITag } from "./tag";

export interface IQuestion {
  id: number;
  question: string;
  answer: string;
  mistake1: string;
  mistake2: string | undefined;
  mistake3: string | undefined;
  // TODO add media
  tags: ITag[];
}
