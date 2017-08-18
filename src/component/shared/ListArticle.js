import React, {Component} from "react";
import { View, FlatList, TouchableOpacity, Text, Image, Dimensions } from "react-native";

export default class ListArticle extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <TouchableOpacity style={styles.article} onPress={() =>
        this.props.navigator.push({
          screen: "article.detail",
          title: "ANGKORVOICE",
          backButtonTitle: "",
          passProps:
            { id: this.props.article.id }
        }) }>
        <Image source={{uri: this.props.article.image_url}} style={styles.articleImage} />
        <View style={styles.articleTitle}>
          <Text style={styles.title} numberOfLines={4} renderTruncatedFooter={() => <ReadMoreButton />}>{this.props.article.title}</Text>
          <Text style={styles.publishDate}>{this.props.article.published_at}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const windowWidth = Dimensions.get('window').width;

const styles= {
  article: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 6,
    backgroundColor: "white",

    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ececec',
  },

  articleImage: {
    flex: 0.4,
    height: windowWidth * 0.25
  },

  articleTitle: {
    padding: 8,
    flex: 0.6
  },

  publishDate: {
    color: "#a7a7a7",
    fontSize: 11,
    fontStyle: "italic",
    marginTop: 5
  }
}
