import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import { Posts, Polls } from "../api/agent";
import { action, computed, configure, observable, runInAction } from "mobx";

configure({ enforceActions: "always" });

class PostStore {
  @observable posts: IPost[] | undefined;
  @observable articles: IPost[] | undefined;
  @observable polls: IPost[] | undefined;
  @observable quizzes: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;

  @observable lastPostId: number | undefined = 1;
  @observable lastLoadedPostId: number | undefined;

  @computed get hasMorePosts() {
    return (
      !this.posts ||
      !this.lastPostId ||
      this.lastPostId !== this.posts[this.posts?.length - 1].id
    );
  }

  @action loadAllPosts = async () => {
    this.loadingInitial = true;
    try {
      let res: IPost[] | undefined = undefined;
      console.log(this.lastLoadedPostId);
      if (this.lastLoadedPostId) {
        res = await Posts.list(this.lastLoadedPostId);
      } else {
        res = await Posts.list();
      }
      // const {posts, lastPostId} = res
      runInAction(() => {
        if (res) {
          res.forEach((post) => {
            post.created_at = new Date(post.created_at);
          });
          //this.lastPostId = lastPostId
          this.lastLoadedPostId = res[res.length - 1].id;
          if (!this.posts) {
            this.posts = res;
          } else {
            this.posts = this.posts.concat(res);
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

  @action loadPostsOfType = async (path: string) => {
    this.loadingInitial = true;
    try {
      let res: IPost[] | undefined = undefined;
      let contentType = this.pathToContentType(path);
      res = await Posts.listOfType(contentType);

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
