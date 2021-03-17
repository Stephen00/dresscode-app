import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import agent from "../api/agent";
import { action, configure, observable, runInAction } from "mobx";
import { QuizSubmissionDTO } from "../models/DTOs/QuizSubmissionDTO";
import { IQuiz } from "../models/quiz";
import { ReactionDTO } from "../models/DTOs/reactionDTO";

configure({ enforceActions: "always" });

class PostStore {
  @observable posts: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;

  @action loadPosts = async (path?: string) => {
    this.loadingInitial = true;
    console.log("loading new posts");
    let res: IPost[] | undefined = undefined;
    try {
      if (path) {
        let contentType = this.pathToContentType(path);
        res = await agent.Posts.listOfType(contentType);
      } else {
        res = await agent.Posts.list();
      }
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
      let res = await agent.Quizzes.submit(
        this.selectedPost?.content.slug!!,
        requestBody
      );
      runInAction(() => {
        console.log(res);
        let quiz = this.selectedPost?.content as IQuiz;
        quiz.score = (res as QuizSubmissionDTO).score;
        quiz.answers = new Map();
        (res as QuizSubmissionDTO).questions.forEach((pair) => {
          quiz.answers!!.set(pair[0] as number, pair[1] as string);
        });
        console.log(quiz.answers);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action reactToPost = async (
    postId: number,
    reaction: string,
    caller: string
  ) => {
    try {
      let post: IPost | undefined;
      if (caller !== "details") {
        post = this.posts!!.filter((post) => {
          return post.id === postId;
        })[0];
      } else {
        post = this.selectedPost;
      }

      const requestBody = {
        postId: postId,
      };

      switch (reaction) {
        case "heart":
          await agent.Posts.heart(requestBody as ReactionDTO);
          runInAction(() => {
            post!!.reaction1_counter += 1;
          });
          break;
        case "star":
          await agent.Posts.star(requestBody as ReactionDTO);
          runInAction(() => {
            post!!.reaction2_counter += 1;
          });
          break;
        case "share":
          await agent.Posts.share(requestBody as ReactionDTO);
          runInAction(() => {
            post!!.reaction3_counter += 1;
          });
          break;
      }
      console.log(post);
    } catch (error) {
      console.log(error);
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
