import ArticleItem from "@/components/ArticleItem";
import getArticles from "@/services/getArticles";
import googleAIService from "@/services/googleAIService";
import { Article } from "@/types/models";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// TODO: remove test data and use real data
const TEST_ARTICLES: Article[] = [
  {
      "source": {
          "id": 'test',
          "name": "9to5google.com"
      },
      "author": "Abner Li",
      "title": "What Google Material 3 Expressive redesigns are rolling out - 9to5Google",
      "description": "Material 3 Expressive redesigns are rolling out to Google apps, and here’s our list of what’s available and still to come on Android phones.",
      "url": "http://9to5google.com/2025/08/10/google-material-3-expressive-redesign/",
      "urlToImage": "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/05/Material-3-Expressive-Google-apps.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
      "publishedAt": "2025-08-10T22:30:00Z",
      "content": "Google announced its new design language in May. Material 3 Expressive redesigns have been slowly rolling out to Google apps since then, and heres our list of whats available and still to come on And… [+3205 chars]"
  },
  {
      "source": {
          "id": 'test',
          "name": "Lookout Landing"
      },
      "author": "Zach Mason",
      "title": "Game 119, Thread 2 - Lookout Landing",
      "description": "",
      "url": "https://www.lookoutlanding.com/game-thread/132623/game-119-thread-2",
      "urlToImage": "https://platform.lookoutlanding.com/wp-content/uploads/sites/101/2025/08/gettyimages-2159667993.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      "publishedAt": "2025-08-10T22:17:52Z",
      "content": "© 2025Vox Media, LLC. All Rights Reserved\r\nGambling Problem? Call 1-800-GAMBLER (1-800-426-2537). Hope is here. GamblingHelpLineMA.org or call (800) 327-5050 for 24/7 support (MA). Visit www.mdgambli… [+230 chars]"
  },
  {
      "source": {
          "id": 'test',
          "name": "EventHubs"
      },
      "author": "Justin AdaptiveTrigger Gordon",
      "title": "Snake Eyez releases new Season 3 tier list that even includes Sagat's position - EventHubs",
      "description": "Sagat and a new patch were released for Street Fighter 6 recently. It would seem that renowned Zangief user Snake Eyez has already reached Legend rank with Sagat.As such, Snake Eyez recently decided to create a new tier list ...",
      "url": "https://www.eventhubs.com/news/2025/aug/10/tiers-snake-eyez-s3-list/",
      "urlToImage": "https://media.eventhubs.com/images/2025/08/10_tiers-snake-eyez-bnrt.webp",
      "publishedAt": "2025-08-10T21:04:55Z",
      "content": "Sagat and a new patch were released for Street Fighter 6 recently. It would seem that renowned Zangief user Snake Eyez has already reached Legend rank with Sagat.\r\nAs such, Snake Eyez recently decide… [+1072 chars]"
  }
];

export default function Index() {
  const [articles, setArticles] = useState<Article[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getCurateArticles = async () => {
        const fetchedArticles = await getArticles();
        const curatedArticles = await googleAIService(fetchedArticles);
        setArticles(curatedArticles);
        console.log('curated articles:\n' + JSON.stringify(curatedArticles, null, 2))
    }
    try {
      // getCurateArticles();
      // TODO: uncomment function and use real data instead
      setArticles(TEST_ARTICLES)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <Text>Getting your articles...</Text>
  }
  return (
    <View
      style={styles.mainContainer}
    >
      <Text style={styles.titleText}>Hello, here are your list of articles</Text>
      <View style={styles.articleContainer}>
        {articles && articles.map((articleData, index) => {
          return (
            <ArticleItem article={articleData} key={index} />
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 40,
  },
  articleContainer: {
    marginTop: 40,
    width: '100%',
    rowGap: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 22,
  }
})
