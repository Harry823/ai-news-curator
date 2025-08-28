import { Article } from "@/types/models";
import { FC, useState } from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

type ArticleItemProps = {
  article: Article;
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const [shouldImageRender, setShouldImageRender] = useState(true);

  const handleImageError = () => {
    setShouldImageRender(true);
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(article.url)}
    >
      {shouldImageRender && (
        <Image
          source={{uri: article.urlToImage}}
          style={styles.imageContainer}
          onError={handleImageError}
        />
      )}
      <Text style={styles.titleText}>{article.title.substring(0, 120)}</Text>
      <Text>{article.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    marginBottom: 18,
    rowGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: 50, 
  },
  imageContainer: {
    height: 140,
    borderRadius: 10,
    width: '100%'
  },
  titleText: {
    fontWeight: 'bold',
    width: '85%',
    fontSize: 18
  }
})

export default ArticleItem;