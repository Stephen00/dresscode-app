import { IPoll } from "../app/models/poll";
import { IPost } from "../app/models/post";
import { IQuiz } from "../app/models/quiz";

export interface DiscoverProps {
  path: string;
}

export interface PollComponentProps {
  poll: IPoll;
}

export interface QuizComponentProps {
  quiz: IQuiz;
}

export interface DetailsProps {
  slug: string;
  path: string;
}

export interface DiscoverCardProps {
  post: IPost;
}
