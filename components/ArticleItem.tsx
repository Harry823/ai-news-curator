import { Article } from "@/types/models";
import { FC } from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ArticleItemProps = {
  article: Article;
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(article.url)}
    >
      <View>
        <Text style={styles.titleText}>{article.title}</Text>
        <Text>{article.description}</Text>
      </View>
      <Image source={{uri: article.urlToImage}} style={styles.imageContainer} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   width: '100%',
   minHeight: 50, 
   borderWidth: 2,
  },
  imageContainer: {
    height: 100,
    width: 180
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default ArticleItem;