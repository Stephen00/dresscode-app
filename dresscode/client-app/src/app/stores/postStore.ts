import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import { Posts, Polls, Quizzes } from "../api/agent";
import { action, computed, configure, observable, runInAction } from "mobx";
import { QuizSubmissionDTO } from "../models/DTOs/QuizSubmissionDTO";
import { IQuiz } from "../models/quiz";
import { ReactionDTO } from "../models/DTOs/reactionDTO";
import { IPostsWrapper } from "../models/DTOs/postsWrapper";

configure({ enforceActions: "always" });

const BATCH_SIZE = 8;

class PostStore {
  @observable posts: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;
  @observable lastPostId: number | undefined;
  @observable lastLoadedPostId: number | undefined;

  @computed get hasMorePosts(): boolean {
    return this.lastLoadedPostId !== this.lastPostId;
  }

  @action removeLastLoadedPost = () => {
    this.lastLoadedPostId = undefined;
    this.lastPostId = undefined;
  };

  @action loadPosts = async (path?: string) => {
    this.loadingInitial = true;
    try {
      let res: IPostsWrapper | undefined = undefined;
      if (path) {
        let contentType = this.pathToContentType(path);
        if (this.lastLoadedPostId) {
          res = await Posts.listOfType(
            contentType,
            BATCH_SIZE,
            this.lastLoadedPostId
          );
        } else {
          res = await Posts.listOfType(contentType, BATCH_SIZE);
        }
      } else {
        if (this.lastLoadedPostId) {
          res = await Posts.list(BATCH_SIZE, this.lastLoadedPostId);
        } else {
          res = await Posts.list(BATCH_SIZE);
        }
      }

      const { posts, lastPostId } = res;

      runInAction(() => {
        if (res) {
          posts.forEach((post) => {
            post.created_at = new Date(post.created_at);
          });
          this.lastPostId = lastPostId;
          this.lastLoadedPostId = posts[posts.length - 1].id;
          if (!this.posts) {
            this.posts = posts;
          } else {
            this.posts = this.posts.concat(posts);
          }
        }
        this.loadingInitial = false;
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
      await Polls.vote(requestBody as PollVoteDTO);
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
      let res = await Quizzes.submit(
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
          await Posts.heart(requestBody as ReactionDTO);
          runInAction(() => {
            post!!.reaction1_counter += 1;
          });
          break;
        case "star":
          await Posts.star(requestBody as ReactionDTO);
          runInAction(() => {
            post!!.reaction2_counter += 1;
          });
          break;
        case "share":
          await Posts.share(requestBody as ReactionDTO);
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
      res = await Posts.details(slug, contentType);

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
    this.lastLoadedPostId = undefined;
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
