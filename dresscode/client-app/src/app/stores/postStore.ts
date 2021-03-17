import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import agent from "../api/agent";
import { action, configure, observable, runInAction } from "mobx";
import { QuizSubmissionDTO } from "../models/DTOs/QuizSubmissionDTO";
import { IQuiz } from "../models/quiz";

configure({ enforceActions: "always" });

class PostStore {
  @observable posts: IPost[] | undefined;
  @observable articles: IPost[] | undefined;
  @observable polls: IPost[] | undefined;
  @observable quizzes: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;

  @action loadAllPosts = async () => {
    this.loadingInitial = true;
    try {
      let res: IPost[] | undefined = undefined;
      res = await agent.Posts.list();

      runInAction(() => {
        if (res) {
          res.forEach((post) => {
            post.created_at = new Date(post.created_at);
          });
          this.posts = res;
          this.loadingInitial = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action voteInPoll = async (pollId: number, selectedAnswer: string) => {
    try {
      const requestBody = {
        pollId: pollId,
        selectedAnswer: selectedAnswer,
      };
      await agent.Polls.vote(requestBody as PollVoteDTO);
    } catch (error) {
      console.log(error);
    }
  };

  @action submitQuiz = async (answers: Map<number, string>) => {
    try {
      const requestBody: QuizSubmissionDTO = {
        score: null,
        questions: [],
      };
      answers.forEach((a, q) => {
        requestBody.questions.push([q, a]);
      });
      console.log(requestBody);
      // let res = await agent.Quizzes.submit(
      //   this.selectedPost?.content.slug!!,
      //   requestBody
      // );
      // runInAction(() => {
      //   console.log(res);
      //   (this.selectedPost?.content as IQuiz).answers = new Map();
      //   (res as QuizSubmissionDTO).questions.forEach((a, q) => {
      //     (this.selectedPost?.content as IQuiz).answers.set(q, a);
      //   });
      //   console.log((this.selectedPost?.content as IQuiz).answers);
      //   (this.selectedPost
      //     ?.content as IQuiz).score = (res as QuizSubmissionDTO).score;
      // });
    } catch (error) {
      console.log(error);
    }
  };

  @action loadPostsOfType = async (path: string) => {
    this.loadingInitial = true;
    try {
      let res: IPost[] | undefined = undefined;
      let contentType = this.pathToContentType(path);
      res = await agent.Posts.listOfType(contentType);

      runInAction(() => {
        if (res) {
          res.forEach((post) => {
            post.created_at = new Date(post.created_at);
          });

          if (contentType === "articles") {
            this.articles = res;
          } else if (contentType === "quizzes") {
            this.quizzes = res;
          } else if (contentType === "polls") {
            this.polls = res;
          }

          this.loadingInitial = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadPost = async (slug: string, path: string) => {
    this.loadingInitial = true;
    try {
      let res: IPost | undefined = undefined;
      let contentType = this.pathToContentType(path);
      res = await agent.Posts.details(slug, contentType);

      runInAction(() => {
        if (res) {
          res.created_at = new Date(res.created_at);
          this.selectedPost = res;
          this.loadingInitial = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action removePostsOfType = (path: string) => {
    let contentType = this.pathToContentType(path);
    if (contentType === "articles") {
      this.articles = undefined;
    } else if (contentType === "quizzes") {
      this.quizzes = undefined;
    } else if (contentType === "polls") {
      this.polls = undefined;
    }
  };

  @action removeAllPosts = () => {
    this.posts = undefined;
  };

  @action removeSelectedPost = () => {
    this.selectedPost = undefined;
  };

  pathToContentType(path: string): string {
    let pathList = path.split("/");
    if (pathList[1] !== "discover") {
      return pathList[1];
    }
    return pathList[2];
  }
}

export default createContext(new PostStore());
