import { ITag } from "./tag";

export interface IArticle{
    pk: number;
    title: string;
    slug: string;
    // TODO add media
    paragraph : string;
    tags: ITag[];
}