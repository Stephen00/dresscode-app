import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../../history";
import { PollVoteDTO } from "../models/DTOs/pollVoteDTO";
import { IPostsWrapper } from "../models/DTOs/postsWrapper";
import { QuizSubmissionDTO } from "../models/DTOs/QuizSubmissionDTO";
import { ReactionDTO } from "../models/DTOs/reactionDTO";
import { IPost } from "../models/post";

//This is our proxy, it points to the back-end application
//To use it please change the url to be the one from which you want to get your information from
//Local host should be http://localhost:8000 or http://127.0.0.1:8000
//DO NOT INCLUDE A / at the end
export const proxy = "https://dresscode-server.herokuapp.com";
axios.defaults.baseURL = proxy;

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error");
  }
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (error.response.status === 500) {
    toast.error("Server error - check terminal for more info!");
  }
});

// axios.interceptors.request.use((request) => {
//   console.log(request.url);
//   return request;
// });

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) =>
//     setTimeout(() => resolve(response), ms)
//   );

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

export const Posts = {
  list: (
    batchSize: number,
    lastLoadedPostId?: number
  ): Promise<IPostsWrapper> => {
    // I know this looks ugly
    // but JS doesn't support conditional concatination with a ternaty operatior
    let path = `/?batchSize=${batchSize}`;
    if (lastLoadedPostId) path += `&lastLoadedPostId=${lastLoadedPostId}`;

    return requests.get(path);
  },
  listOfType: (
    contentType: string,
    batchSize: number,
    lastLoadedPostId?: number
  ): Promise<IPostsWrapper> => {
    let path = `/discover/${contentType}/?batchSize=${batchSize}`;
    if (lastLoadedPostId) path += `&lastLoadedPostId=${lastLoadedPostId}`;

    return requests.get(path);
  },
  details: (slug: string, contentType: string): Promise<IPost> =>
    requests.get(`/discover/${contentType}/${slug}/`),
  heart: (reaction: ReactionDTO) => requests.put("/heart/", reaction),
  star: (reaction: ReactionDTO) => requests.put("/star/", reaction),
  share: (reaction: ReactionDTO) => requests.put("/share/", reaction),
};

export const Polls = {
  vote: (vote: PollVoteDTO) => requests.put("/discover/polls/vote/", vote),
};

export const Quizzes = {
  submit: (slug: string, answers: QuizSubmissionDTO) =>
    requests.put(`/discover/quizzes/${slug}/answer/`, answers),
};

