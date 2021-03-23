import { ITag } from "./tag";

export interface IPoll {
  pk: number;
  title: string;
  // TODO add media
  answer1: string;
  answer2: string;
  answer3: string | undefined;
  answer4: string | undefined;
  answer5: string | undefined;
  vote1: number;
  vote2: number;
  vote3: number | undefined;
  vote4: number | undefined;
  vote5: number | undefined;
  tags: ITag[];
  slug: string;
}