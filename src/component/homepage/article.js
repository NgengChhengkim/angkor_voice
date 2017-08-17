import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Admob from "../shared/admob";

class Article extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.articleList}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.articles}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.item} onPress={() =>
              this.props.navigator.push({
                screen: "article.detail",
                title: "ANGKORVOICE",
                passProps:
                  { id: item.id }
              }) }>
              <Image source={{uri: item.image_url}} style={styles.image} />
              <Text style={styles.title} numberOfLines={2} renderTruncatedFooter={() => <ReadMoreButton />}>{item.title}</Text>
            </TouchableOpacity>
          }/>
          <Admob />
      </View>
    )
  }
}

const styles = {
  articleList: {
    paddingLeft: 3,
    paddingRight: 3
  },

  image: {
    height: 150,
    marginBottom: 5
  },

  item: {
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 3,
    padding: 10,
    height: 230,
    backgroundColor: "white"
  },

  title: {
    width: 150
  }
};

export default Article;
