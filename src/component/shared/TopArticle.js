import React, {Component} from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default class TopArticle extends Component {
  constructor(props) {
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

        <View style={styles.topArticle}>
          <Image
            style={styles.image}
            source={{uri: this.props.article.image_url}}>
            <View style={styles.content}>
              <Text style={styles.title}>{this.props.article.title}</Text>
              <Text style={styles.publishDate}>{this.props.article.published_at}</Text>
            </View>
          </Image>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },

  topArticle: {
    flex: 1,
     justifyContent: "center",
     position: "relative"
  },

  content: {
    padding: 10,
    backgroundColor: "rgba(2, 2, 2, 0.24)",
  },

  title: {
    color: "white",
    fontSize: 16,
  },

  publishDate: {
    color: "white",
    fontSize: 11,
    fontStyle: "italic"
  },

  image: {
    height: 200,
    justifyContent: "flex-end"
  }
}
