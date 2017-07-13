import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, PixelRatio } from "react-native";
import HTML from "react-native-fence-html";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {content: ""}
    };
  }

  componentDidMount() {
    fetch("http://www.angkorvoice.com/api/v1/articles/" + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({article: responseJson.data});
      })
      .catch((error) => {
        console.error(error);
      }
    );
  }

  render () {
    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.image}
              source={{uri: "http://www.angkorvoice.com" + htmlAttribs.src}} />
          </View>
        )
      }
    }

    return (
      <ScrollView style={styles.articleDetail}>
        <Text style={styles.title}>{this.state.article.title}</Text>
        <Text style={styles.publishedAt}>{this.state.article.published_at}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: this.state.article.image_url}} />
        </View>
        <HTML html={this.state.article.content.replace(/<p>/g, "").replace(/<\/p>/g, "<br>")}
          htmlStyles={styles} renderers={renderers} />
      </ScrollView>
    )
  }
}

const windowWidth = Dimensions.get('window').width * PixelRatio.get()

const styles = {
  title: {
    fontWeight: "bold",
    fontSize: 17
  },

  publishedAt: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#7E7E7E"
  },

  articleDetail: {
    paddingLeft: 10,
    paddingRight: 10
  },

  image: {
    flex: 1,
    resizeMode: "cover"
  },

  imageContainer: {
    flex: 1,
    height: 200,
    flexDirection: "row"
  }
}
