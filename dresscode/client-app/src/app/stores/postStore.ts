import { createContext } from "react";
import { IPost } from "../models/post";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import agent from "../api/agent";
import { action, configure, observable, runInAction } from "mobx";
import { QuizSubmissionDTO } from "../models/DTOs/QuizSubmissionDTO";
import { IArticle } from "../models/article";
import { IQuiz } from "../models/quiz";
import { IPoll } from "../models/poll";
import { ReactionDTO } from "../models/DTOs/reactionDTO";
import { history } from "./../../history";
configure({ enforceActions: "always" });

class PostStore {
  constructor() {
    this.handleUrlChanged();
  }

  @observable searchValue: string = ""; 
  @observable filteredPosts: IPost[] | undefined;
  @observable posts: IPost[] | undefined;
  @observable selectedPost: IPost | undefined;
  @observable loadingInitial = false;

  @action handleUrlChanged () {
    history.listen((location) => {
      if (location.pathname !== "/latest") {
        this.setSearchValue("")
      }
    });
  }  

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
  };

  @action setSearchValue = (value: string) => {
    this.searchValue = value;
  }

  @action showFilteredResults = async () => {
    if (this.searchValue === "") {
      this.loadPosts();
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
