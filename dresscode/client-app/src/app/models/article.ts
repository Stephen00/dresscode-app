import { ITag } from "./tag";

export interface IArticle {
  pk: number;
  title: string;
  // TODO add media
  text: string;
  tags: ITag[];
  slug: string;
}
