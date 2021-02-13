import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { IPost } from "../models/post";

axios.defaults.baseURL = "http://127.0.0.1:8000";

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

const Posts = {
  list: (): Promise<IPost[]> => requests.get("/"),
  listOfType: (contentType: string): Promise<IPost[]> =>
    requests.get(`/discover/${contentType}/`),
  details: (slug: string, contentType: string): Promise<IPost> =>
    requests.get(`/discover/${contentType}/${slug}/`),
  update: (article: IPost, contentType: string) =>
    requests.put(`/discover/${contentType}/${article.content.slug}/`, article),
};

export default {
  Posts,
};
