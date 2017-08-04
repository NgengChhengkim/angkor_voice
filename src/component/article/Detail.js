import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, PixelRatio, TouchableOpacity } from "react-native";
import HTML from "react-native-fence-html";
import navigatorStyle from "./../shared/navigatorStyle";
import Loading from "./../shared/loading";

import FBSDK from 'react-native-fbsdk';

const {
  ShareDialog,
} = FBSDK;

export default class Detail extends Component {
  static navigatorStyle = navigatorStyle;

  constructor(props) {
    super(props);

    this.state = {
      article: {content: ""},
      loading: true
    };
  }

  componentDidMount() {
    fetch("https://www.angkorvoice.com/api/v1/articles/" + this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({article: responseJson.data, loading: false});
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }


  shareLinkWithShareDialog() {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://www.angkorvoice.com/articles/" + this.props.id
    }

    var tmp = this;
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }

  render () {
    const renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.image}
              source={{uri: "https://www.angkorvoice.com" + htmlAttribs.src}} />
          </View>
        )
      }
    }

    if (this.state.loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <ScrollView style={styles.articleDetail}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: this.state.article.image_url}} />
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{this.state.article.title}</Text>
            <View style={styles.publishedAtShare}>
              <TouchableOpacity onPress={() => this.shareLinkWithShareDialog()}>
                <Image
                  style={styles.fbShare}
                  source={require("./../../images/fb-share-button.png")}
                />
              </TouchableOpacity>
              <Text style={styles.publishedAt}>{this.state.article.published_at}</Text>
            </View>
            <HTML html={this.state.article.content.replace(/<p>/g, "  ").replace(/<\/p>/g, "<br>")}
              htmlStyles={styles} renderers={renderers} />
          </View>
        </ScrollView>
      )
    }
  }
}

const windowWidth = Dimensions.get('window').width * PixelRatio.get()

const styles = {
  bodyContainer: {
    padding: 5
  },

  title: {
    fontWeight: "bold",
    fontSize: 17
  },

  publishedAt: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#7E7E7E"
  },

  image: {
    flex: 1,
    resizeMode: "cover"
  },

  imageContainer: {
    flex: 1,
    height: 200,
    flexDirection: "row"
  },

  publishedAtShare: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 3
  },

  fbShare: {
    height: 20,
    width: 80,
    marginRight: 3,
    borderRadius: 2
  }
}
