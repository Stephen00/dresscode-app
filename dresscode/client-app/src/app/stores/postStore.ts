import { createContext } from "react";
import { IPost } from "../models/post";
import agent from "../api/agent";
import { action, configure, observable, runInAction, computed } from "mobx";

configure({ enforceActions: "always" });

class PostStore {
  @observable searchValue: string = ""; 
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

  @action getSearchValue = (value: string) => {
    this.searchValue = value
    this.showFilteredResults()
  }

  @action showFilteredResults = async () => {
    if (this.searchValue === "") {
      this.loadAllPosts()
    } else {
      this.posts =  this.posts?.filter(post => {
                      return post.content.title.toLowerCase().indexOf(this.searchValue) > -1
                    }) 
    }
  };
}

export default createContext(new PostStore());
