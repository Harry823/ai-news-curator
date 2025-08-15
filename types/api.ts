import { Article } from "./models";

export interface GetArticlesData {
  status: string;
  totalResults: number;
  articles: Article[];
}
export interface GetArticlesResponse {
  data: GetArticlesData;
  status: number;
  statusText: string;
  heaers: any;
  config: any;
  request: any;
}