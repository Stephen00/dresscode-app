import { createContext } from "react";
import { IPost } from "../models/post";
import agent from "../api/agent";
import { action, configure, observable, runInAction } from "mobx";

configure({ enforceActions: "always" });

class ArticleStore {
  @observable articles: IPost[] | undefined;
  @observable selectedArticle: IPost | undefined;
  @observable loadingInitial = false;

  @action loadArticles = async () => {
    this.loadingInitial = true;
    try {
      let res = await agent.Articles.listAsPosts();
      runInAction(() => {
        res.forEach((post) => {
          post.created_at = new Date(post.created_at);
        });
        this.articles = res;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action selectArticle = (id: number) => {
    runInAction(() => {
      if (this.articles) {
        this.selectedArticle = this.articles.find((a) => a.id === id);
      }
    });
  };

  @action removeAllArticles = () => {
    this.articles = undefined;
  };

  @action removeSelectedArticle = () => {
    this.selectedArticle = undefined;
  };
}

export default createContext(new ArticleStore());
