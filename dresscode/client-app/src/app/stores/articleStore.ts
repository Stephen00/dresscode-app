import { createContext } from "react";
import { IArticle } from "../models/article";
import agent from "../api/agent";
import { action, configure, observable, runInAction } from "mobx";

configure({ enforceActions: "always" });

class ArticleStore {
  @observable articles: IArticle[] | undefined;
  @observable selectedArticle: IArticle | undefined;
  @observable loadingInitial = false;

  @action loadArticles = async () => {
    this.loadingInitial = true;
    try {
      let res = await agent.Articles.list();
      runInAction(() => {
        this.articles = res;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action selectArticle = (pk: number) => {
    runInAction(() => {
      if (this.articles) {
        this.selectedArticle = this.articles.find((a) => a.pk === pk);
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
