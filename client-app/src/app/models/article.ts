import { IMedia } from "./media";
import { ITag } from "./tag";

export interface IArticle {
  pk: number;
  title: string;
  media: IMedia | undefined;
  text: string;
  tags: ITag[];
  slug: string;
}
