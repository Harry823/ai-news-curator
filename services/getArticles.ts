import { GetArticlesResponse } from '@/types/api';
import axios from 'axios';

// TODO: add feature to add and remove sources
const EXAMPLE_SOURCES = [
  'hacker-news',
  'recode',
  'techcrunch',
  'the-next-web'
]

const getArticles = async () => {
  try {
    if (!process.env.EXPO_PUBLIC_NEWSAPI_URL) {
      throw new Error("NewsAPI URL is undefined. Please check env configurations.")
    } else if (!process.env.EXPO_PUBLIC_NEWSAPI_URL) {
      throw new Error("NewsAPI API Key is undefined. Please check env configurations.")
    }

    const articlesResponse: GetArticlesResponse = await axios.get(process.env.EXPO_PUBLIC_NEWSAPI_URL, {
      params: {
        apiKey: process.env.EXPO_PUBLIC_NEWSAPI_API_KEY,
        language: 'en',
        sources: EXAMPLE_SOURCES.join(),
        pageSize: 37
      }
    })

    if (articlesResponse.data.status === 'ok') {
      return articlesResponse.data.articles;
    }
  } catch (error) {
    console.log('getArticles Error:', error)
  }
}

export default getArticles;
