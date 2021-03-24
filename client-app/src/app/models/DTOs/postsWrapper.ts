import { IPost } from "../post";

export interface IPostsWrapper {
  posts: IPost[];
  lastPostId: number;
}
