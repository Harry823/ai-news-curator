import getArticles from "./getArticles";
import googleAIService from "./googleAIService";

const curateArticles = async () => {
  const fetchedArticles = await getArticles();
  if (fetchedArticles) {
    const curatedArticles = await googleAIService(fetchedArticles);
    //TODO: return curated articles to display on app
    // console.log('curated articles:\n' + JSON.stringify(curatedArticles, null, 2))
  }
}

export default curateArticles;
