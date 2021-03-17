import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import agent from "../api/agent";
import { action, configure, observable, runInAction, computed } from "mobx";
import { IArticle } from "../../app/models/article";
import { IQuiz } from "../../app/models/quiz";
import { IPoll } from "../../app/models/poll";
import { history } from "./../../history";

configure({ enforceActions: "always" });

class PostStore {
  constructor() {
    this.handleUrlChanged();
  }

  @observable searchValue: string = ""; 
  @observable posts: IPost[] | undefined;
  @observable filteredPosts: IPost[] | undefined;
  @observable articles: IPost[] | undefined;
  @observable polls: IPost[] | undefined;
  @observable quizzes: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;

  @action handleUrlChanged () {
    history.listen((location) => {
      if (location.pathname !== "/latest") {
        this.setSearchValue("")
      }
    });
  }

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
          this.filteredPosts = [...this.posts]
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
  };

  @action getSearchValue = () => {
    this.showFilteredResults();
  };

  @action setSearchValue = (value: string) => {
    this.searchValue = value;
  }

  @action showFilteredResults = async () => {
    if (this.searchValue === "") {
      this.loadAllPosts();
      this.filteredPosts =  this.posts
    } else {
      this.toFilterPost();
    }
  };

  @action toFilterPost = async () => {
    this.filteredPosts =  this.posts?.filter(post => {
      this.searchValue = this.searchValue.toLowerCase()
      let tempPost = post.content;
      let tags = tempPost.tags.map(obj => obj.tag);

      if (this.helperFunction (tags)) {
        return post;
      } else if (tempPost.title.toLowerCase().indexOf(this.searchValue) > -1) {
        return post;
      } else if (post.content_type === "articles") {
        if ((tempPost as IArticle).text.toLowerCase().indexOf(this.searchValue) > -1) {
          return post;
        }
      } else if (post.content_type === "polls") {
        const answers = [
          (tempPost as IPoll).answer1,
          (tempPost as IPoll).answer2,
          (tempPost as IPoll).answer3,
          (tempPost as IPoll).answer4,
        ].filter(Boolean);

        if (this.helperFunction (answers)) {
          return post;
        }
      } else if (post.content_type === "quizzes") {
        let questions = (post.content as IQuiz).questions.map(obj => obj.question);

        if (this.helperFunction (questions)) {
          return post;
        }
      }
    })
  }

  helperFunction (array: (string | undefined)[]) : Boolean {
    let isFound: Boolean = false;
    array!!.some(object => {
      if (object!!.toLowerCase().indexOf(this.searchValue) > -1) {
        isFound = true;
        return true;
      }
    })
    return isFound
  }
}

export default createContext(new PostStore());
