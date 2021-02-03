import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/post";
import { IArticle } from "../models/article";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

const Articles = {
  listAsPosts: (): Promise<IPost[]> => requests.get("/discover/articles/"),
  details: (slug: string) => requests.get(`/discover/articles/${slug}`),
  update: (article: IPost) =>
    requests.put(`/discover/articles/${article.content.slug}`, article),
};

export default {
  Articles,
};
