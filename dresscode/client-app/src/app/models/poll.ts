import { ITag } from "./tag";

export interface IPoll{
    pk: number;
    question: string;
    media: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    
    vote1: number;
    vote2: number;
    vote3: number;
    vote4: number;
    slug: string;
    tags: ITag[];
}