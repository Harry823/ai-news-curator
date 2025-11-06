import { Article } from "@/types/models";
import { GoogleGenAI } from "@google/genai";

// TODO: add feature to add and remove interests
const SAMPLE_INTERESTS = [
  'Software Engineer',
  'web development',
  'Developer',
  'ai'
]

const googleAIService = async (articles: Article[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });
  const examplePrompt = `
    You are a curator for news articles.
    You are given a list of interests for the the user:${SAMPLE_INTERESTS}.
    using this JSON formatted list of articles:
    ${JSON.stringify(articles)}, give me the 3 articles that best fit their interests.
    Prioritize the latest articles, and rank the interests based on the start of the array.
    Output needs to retain the original JSON list object format.`;
  /**
   * logic for counting tokens.
   * uncomment when needed to check prompt tokens used.
   */
  // console.log('example prompt', examplePrompt);
  // const tokenCount = await ai.models.countTokens({
  //  model: "gemini-2.0-flash",
  //  contents: examplePrompt
  // })
  // console.log(JSON.stringify(tokenCount, null, 2))
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: examplePrompt,
    config: {
      responseMimeType: "application/json",
    }
  });
  if (!response.text) {
    throw new Error('googleAIService Error: No response text from API')
  }
  const articleResponse: Article[] = JSON.parse(response.text);
  return articleResponse;
}

export default googleAIService;